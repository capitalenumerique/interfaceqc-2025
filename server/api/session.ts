import { GET_SESSION_BY_ID } from '~~/queries/get-session-by-id';
import useSwapcardClient from '../useSwapcardClient';

type Session = {
    id: string;
    beginsAt: string;
    endsAt: string;
    description: string;
    descriptionTranslations: { language: string; value: string }[];
    categories: string[];
    place: string;
    title: string;
    titleTranslations: { language: string; value: string }[];
};

type EventPerson = {
    id: string;
    firstName: string;
    lastName: string;
    jobTitle: string;
    jobTitleTranslations: { language: string; value: string }[];
    photoUrl: string | null;
    organization: string;
    biography: string | null;
    biographyTranslations: { language: string; value: string }[];
    speakerOnPlannings: Session[];
};

type SessionResponse = {
    data: {
        eventPerson: {
            nodes: EventPerson[];
        };
    };
};

export default defineEventHandler(async (event) => {
    const query = getQuery(event);
    const sessionId = query.id;

    const response = (await useSwapcardClient({
        query: GET_SESSION_BY_ID,
        variables: { sessionId },
    })) as SessionResponse;

    const filteredResponse: SessionResponse = {
        data: {
            eventPerson: {
                nodes: response.data?.eventPerson?.nodes
                    .map((person) => ({
                        ...person,
                        speakerOnPlannings: person.speakerOnPlannings
                            .filter((session) => session.id === sessionId)
                            .map((session) => ({
                                ...session,
                                date: session.beginsAt.split(' ')[0], // Extract Date
                                beginsAt: session.beginsAt.split(' ')[1], // Extract Start Time
                                endsAt: session.endsAt.split(' ')[1], // Extract End Time
                            })),
                    }))
                    .filter((person) => person.speakerOnPlannings.length > 0),
            },
        },
    };

    return filteredResponse;
});
