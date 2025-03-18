export default function () {
    const { data, error, suspense, isLoading } = useQuery({
        queryKey: ['schedule'],
        queryFn: () => $fetch('/api/schedule'),
    });

    return {
        data,
        error,
        suspense,
        isLoading,
    };
}
