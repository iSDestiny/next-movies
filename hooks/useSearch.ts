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

const useSearch = (
    type: string,
    query: string,
    shouldFetch: boolean,
    page?: number
) => {
    const searchTypes = {
        movie: '/search/movie',
        tv: '/search/tv',
        person: '/search/person',
        keyword: '/search/keyword',
        multi: '/search/multi'
    };

    const { data, error } = useSWR(
        shouldFetch ? [searchTypes[type], query, page] : null,
        fetchSearch
    );

    return {
        data,
        isLoading: !data && !error,
        isError: error
    };
};

export default useSearch;
