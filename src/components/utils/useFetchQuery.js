import { useQuery } from '@tanstack/react-query';

export const useFetchQuery = (key, url) => {
    return useQuery({
        queryKey: [key, url],
        queryFn: async () => {
            const token = localStorage.getItem('accessToken');

            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to fetch data');
            }

            const result = await response.json();
            return result;
        },
        enabled: !!localStorage.getItem('accessToken'),
    });
};