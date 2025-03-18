export default function (sessionId: string) {
    const { data, error, suspense, isLoading } = useQuery({
        queryKey: ['session', sessionId],
        queryFn: () => $fetch(`/api/session?id=${sessionId}`),
    });

    return {
        data,
        error,
        suspense,
        isLoading,
    };
}
