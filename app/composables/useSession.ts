const useSession = (sessionId: string) => {
    // Fetch function using our API route
    const fetcher = async () => {
        return await fetch(`/api/session?id=${sessionId}`).then((response) => response.json());
    };

    const { data, error, suspense, isFetching } = useQuery({
        queryKey: ['session'],
        queryFn: fetcher,
        enabled: !!sessionId,
    });

    return {
        data,
        error,
        suspense,
        isLoading: isFetching,
    };
};

export default useSession;
