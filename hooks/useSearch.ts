import { useState } from 'react';
import useSWR from 'swr';
import axios from 'axios';

const fetchSearch = async (url: string, query: string, page?: number) => {
    const { data } = await axios.get(url, {
        params: {
            query,
            page
        }
    });
    return data as SearchResults;
};

const useSearch = (type: string, query: string, shouldFetch: boolean) => {
    const [page, setPage] = useState(1);
    const { data, error } = useSWR(
        shouldFetch ? [`/api/search/${type}`, query, page] : null,
        fetchSearch
    );

    return {
        data,
        page,
        setPage: (newPage: number) => setPage(newPage),
        isLoading: !data && !error,
        isError: error
    };
};

export default useSearch;
