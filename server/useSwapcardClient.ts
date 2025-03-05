type Props = {
    query: string;
};

const useSwapcardClient = async ({ query }: Props) => {
    const config = useRuntimeConfig();

    const response = await $fetch(config.public.swapcardGraphqlEndpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${config.swapcardToken}`, // Secure API key
        },
        body: JSON.stringify({ query, variables: { eventId: config.swapcardEventId } }),
    });

    return response;
};

export default useSwapcardClient;
