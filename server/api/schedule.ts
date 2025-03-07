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
    type: string;
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

    // Réorganiser les sessions
    const sessions = speakers.flatMap((speaker) =>
        speaker.speakerOnPlannings.map((session) => ({
            id: session.id,
            date: session.beginsAt.split(' ')[0], // Date
            time: session.beginsAt.split(' ')[1], // Temps
            title: session.title,
            categories: session.categories,
            place: session.place,
            type: session.type,
            speaker: {
                id: speaker.id,
                firstName: speaker.firstName,
                lastName: speaker.lastName,
                organization: speaker.organization,
            } as Speaker,
        })),
    );

    // Grouper les sessions par date
    const groupedSessions = groupBy(sessions, (session) => session.date);

    // Définir les créneaux horaire pour la journée
    const timeslotRange = Array.from({ length: 9 }, (_, i) => {
        const hour = 9 + i;
        return new Date(0, 0, 0, hour, 0, 0);
    });

    // Associe les bonnes sessions aux bons créneaux horaires
    const findTimeslot = (time: string): string => {
        const [hour, minute] = time.split(':').map(Number);
        const sessionTime = new Date(0, 0, 0, hour, minute, 0);

        return (
            timeslotRange
                .slice()
                .reverse()
                .find((slot) => slot <= sessionTime)
                ?.toTimeString()
                .split(' ')[0] || '09:00:00'
        );
    };

    // Extraire les catégories uniques et leur assigner des couleurs
    const allCategories = Array.from(new Set(sessions.flatMap((session) => session.categories)));
    const colorArray = ['red', 'yellow', 'pink', 'blue', 'teal', 'gray', 'orange'];
    const categoryColorMap: Record<string, string> = {};

    allCategories.forEach((category, index) => {
        categoryColorMap[category] = category === 'Keynote' ? 'transparent' : colorArray[index % colorArray.length];
    });

    // Extraire les salles uniques
    const uniquePlaces = Array.from(
        new Set(
            sessions
                .filter((session) => session.place && session.type === 'Conférence')
                .map((session) => session.place),
        ),
    ).sort((a, b) => {
        // Ordonner les salles et prendre en compte si leur nom contient un chiffre
        const extractNumericValue = (place: string): number => {
            const match = place.match(/(\d+)/);
            return match ? parseInt(match[0], 10) : Infinity;
        };
        return extractNumericValue(a) - extractNumericValue(b);
    });

    // Ordonner les sessions par date et créneaux horaires
    const sortedResult = Object.keys(groupedSessions)
        .sort((a, b) => new Date(a).getTime() - new Date(b).getTime())
        .map((date) => ({
            date,
            timeslots: timeslotRange.map((slot) => {
                const timeString = slot.toTimeString().split(' ')[0];

                // Trouver les sessions de ce créneau horaire
                const sessionsInTimeslot = groupedSessions[date].filter(
                    (session) => findTimeslot(session.time) === timeString,
                );

                // Valider s'il s'agit d'une conférence
                const specialSession = sessionsInTimeslot.find((session) => session.type !== 'Conférence');

                let places;
                let type;
                if (specialSession) {
                    // S'il s'agit d'un autre type que "Conférence", par exemple: un keynote, un atelier au dîner
                    // ou un 5 à 7, elle sera la seule session du créneau horaire
                    places = [
                        {
                            name: specialSession.place,
                            session: {
                                title: specialSession.title,
                                time: specialSession.time,
                                categories: specialSession.categories.map((cat) => ({
                                    name: cat,
                                    color: categoryColorMap[cat],
                                })),
                                type: specialSession.type,
                                speakers: uniqBy(
                                    groupedSessions[date]
                                        .filter((s) => s.title === specialSession.title)
                                        .map((s) => s.speaker),
                                    (speaker) => speaker.id,
                                ),
                            },
                        },
                    ];
                    type = 'special';
                } else {
                    // Conférences par défaut
                    places = uniquePlaces.map((place) => {
                        const sessionInPlace = sessionsInTimeslot.find((session) => session.place === place);
                        return {
                            name: place,
                            session: sessionInPlace
                                ? {
                                      title: sessionInPlace.title,
                                      time: sessionInPlace.time,
                                      categories: sessionInPlace.categories.map((cat) => ({
                                          name: cat,
                                          color: categoryColorMap[cat],
                                      })),
                                      type: sessionInPlace.type,
                                      speakers: uniqBy(
                                          groupedSessions[date]
                                              .filter((s) => s.title === sessionInPlace.title)
                                              .map((s) => s.speaker),
                                          (speaker) => speaker.id,
                                      ),
                                  }
                                : null,
                        };
                    });
                    type = 'regular';
                }

                return {
                    time: timeString,
                    places,
                    type,
                };
            }),
        }));

    return sortedResult;
});
