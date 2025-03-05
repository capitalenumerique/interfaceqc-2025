const useSchedule = () => {
    // Fetch function using our API route
    const fetcher = async () => {
        return await fetch('/api/schedule').then((response) => response.json());
    };

    const { data, error, suspense, isFetching } = useQuery({
        queryKey: ['schedule'],
        queryFn: fetcher,
    });

    return {
        data,
        error,
        suspense,
        isLoading: isFetching,
    };
};

export default useSchedule;
