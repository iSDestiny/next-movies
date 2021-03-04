import { useState } from 'react';
import axios from 'axios';
import useSWR from 'hooks/useSwr';

const fetchTrending = async (url: string, page: number) => {
    const { data }: ResponseWithDetails<Trending> = await axios.get(url, {
        params: {
            page
        }
    });
    return data;
};

const useTrending = (
    mediaType: 'movie' | 'tv',
    timeWindow: 'day' | 'week',
    initialData?: Trending
) => {
    const [page, setPage] = useState(1);
    const key = [`/api/trending/${mediaType}/${timeWindow}`, page];

    const { data, error } = useSWR<Trending, any>(key, fetchTrending, {
        initialData
    });

    return {
        data,
        page,
        setPage: (newPage: number) => setPage(newPage),
        isLoading: !data && !error,
        isError: error
    };
};

export default useTrending;
