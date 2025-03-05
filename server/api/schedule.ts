import { GET_EVENT_BY_ID } from '~~/queries/get-event-by-id';
import useSwapcardClient from '../useSwapcardClient';

export default defineEventHandler(async () => {
    const response = await useSwapcardClient({ query: GET_EVENT_BY_ID });

    return response;
});
