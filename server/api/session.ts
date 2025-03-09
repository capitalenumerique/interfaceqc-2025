import { GET_SESSION_BY_ID } from '~~/queries/get-session-by-id';
import useSwapcardClient from '../useSwapcardClient';

export default defineEventHandler(async (event) => {
    const query = getQuery(event);
    const sessionId = query.id;

    const response = await useSwapcardClient({ query: GET_SESSION_BY_ID, variables: { sessionId } });

    return response;
});
