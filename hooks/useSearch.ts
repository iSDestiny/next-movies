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

const useSearch = (query: string, shouldFetch: boolean, page?: number) => {
    const { data, error } = useSWR(
        shouldFetch ? ['/search/multi', query, page] : null,
        fetchSearch
    );

    return {
        data,
        isLoading: !data && !error,
        isError: error
    };
};

export default useSearch;