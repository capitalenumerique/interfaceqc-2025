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

    // Type the sessions array
    const sessions = speakers.flatMap((speaker) =>
        speaker.speakerOnPlannings.map((session) => ({
            date: session.beginsAt.split(' ')[0],
            title: session.title,
            categories: session.categories,
            speaker: {
                id: speaker.id,
                firstName: speaker.firstName,
                lastName: speaker.lastName,
                email: speaker.email,
                photoUrl: speaker.photoUrl,
                organization: speaker.organization,
                jobTitle: speaker.jobTitle,
            } as Speaker,
        })),
    );

    const groupedSessions = groupBy(sessions, (session) => session.date);

    const result = Object.keys(groupedSessions).map((date) => ({
        date,
        sessions: groupedSessions[date].map((session) => ({
            title: session.title,
            categories: session.categories,
            speakers: uniqBy(
                groupedSessions[date].filter((s) => s.title === session.title).map((s) => s.speaker),
                (speaker) => speaker.id,
            ),
        })),
    }));

    return result;
});
