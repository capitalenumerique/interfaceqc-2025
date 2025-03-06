import { GET_EVENT_BY_ID } from '~~/queries/get-event-by-id';
import useSwapcardClient from '../useSwapcardClient';
import { groupBy, uniqBy } from 'es-toolkit';

interface Speaker {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    photoUrl: string;
    organization: string;
    jobTitle: string;
}

interface Session {
    id: string;
    beginsAt: string;
    endsAt: string;
    categories: string[];
    title: string;
    place: string;
}

interface EventPerson {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    biography: string;
    photoUrl: string;
    organization: string;
    jobTitle: string;
    speakerOnPlannings: Session[];
}

interface EventResponse {
    data: {
        eventPerson: {
            nodes: EventPerson[];
        };
    };
}

export default defineEventHandler(async () => {
    const response = (await useSwapcardClient({ query: GET_EVENT_BY_ID })) as EventResponse;

    const speakers: EventPerson[] = response.data.eventPerson.nodes;

    // Remanier la réponse pour que les conférenciers soient dans les conférences
    const sessions = speakers.flatMap((speaker) =>
        speaker.speakerOnPlannings.map((session) => ({
            date: session.beginsAt.split(' ')[0],
            time: session.beginsAt.split(' ')[1],
            title: session.title,
            categories: session.categories,
            place: session.place,
            speaker: {
                id: speaker.id,
                firstName: speaker.firstName,
                lastName: speaker.lastName,
                organization: speaker.organization,
            } as Speaker,
        })),
    );

    // Grouper les conférences par date
    const groupedSessions = groupBy(sessions, (session) => session.date);

    // Définit les heures de la journée
    const timeslotRange = Array.from({ length: 9 }, (_, i) => {
        const hour = 9 + i;
        return new Date(0, 0, 0, hour, 0, 0);
    });

    // Permet de placer une conférence dans le bon créneau horaire
    const findTimeslot = (time: string): string => {
        const [hour, minute, second] = time.split(':').map(Number);
        const sessionTime = new Date(0, 0, 0, hour, minute, second);

        return (
            timeslotRange
                .slice()
                .reverse()
                .find((slot) => slot <= sessionTime)
                ?.toTimeString()
                .split(' ')[0] || '09:00:00'
        );
    };

    // Extraire toutes les catégories uniques
    const allCategories = Array.from(new Set(sessions.flatMap((session) => session.categories)));

    // Assigner des couleurs aux catégories
    const colorArray = ['red', 'yellow', 'pink', 'blue', 'teal', 'gray', 'orange'];
    const categoryColorMap: Record<string, string> = {};
    allCategories.forEach((category, index) => {
        categoryColorMap[category] = category === 'Keynote' ? 'transparent' : colorArray[index % colorArray.length];
    });

    // Ordonner les dates et regrouper par heures de la journée
    const sortedResult = Object.keys(groupedSessions)
        .sort((a, b) => new Date(a).getTime() - new Date(b).getTime())
        .map((date) => ({
            date,
            timeslots: timeslotRange.map((slot) => ({
                time: slot.toTimeString().split(' ')[0],
                sessions: groupedSessions[date]
                    .filter((session) => findTimeslot(session.time) === slot.toTimeString().split(' ')[0])
                    .map((session) => ({
                        title: session.title,
                        time: session.time,
                        categories: session.categories.map((cat) => ({
                            name: cat,
                            color: categoryColorMap[cat],
                        })),
                        place: session.place,
                        speakers: uniqBy(
                            groupedSessions[date].filter((s) => s.title === session.title).map((s) => s.speaker),
                            (speaker) => speaker.id,
                        ),
                    })),
            })),
        }));

    return sortedResult;
});
