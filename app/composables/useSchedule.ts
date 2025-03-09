const useSchedule = () => {
    const { data, error, suspense, isFetching } = useQuery({
        queryKey: ['schedule'],
        queryFn: () => $fetch('/api/schedule'),
    });

    return {
        data,
        error,
        suspense,
        isLoading: isFetching,
    };
};

export default useSchedule;
