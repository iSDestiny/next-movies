import { useState } from 'react';
import useSWR from 'swr';
import tmdbFetch from 'utils/tmdbFetch';

const fetchSearch = async (url: string, query: string, page?: number) => {
    const { data } = await tmdbFetch.get(url, {
        params: {
            query: query,
            page: page
        }
    });
    return data as SearchResults;
};

const useSearch = (type: string, query: string, shouldFetch: boolean) => {
    const [page, setPage] = useState(1);
    const { data, error } = useSWR(
        shouldFetch ? [`/search/${type}`, query, page] : null,
        fetchSearch
    );

    return {
        data,
        page,
        setPage: (newPage: number) => {
            console.log(type);
            setPage(newPage);
        },
        isLoading: !data && !error,
        isError: error
    };
};

export default useSearch;
