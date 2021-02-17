import { useEffect, useState } from 'react';
import useSWR from 'swr';
import tmdbFetch from 'utils/tmdbFetch';

export interface Filters {
    certification?: string;
    releaseYear?: number;
    releaseYearGreater?: Date;
    releaseYearLess?: Date;
    voteCountGreater?: number;
    voteCountLess?: number;
    ratingGreater?: number;
    ratingLess?: number;
    includeGenres?: string;
    excludeGenres?: string;
    includeKeywords?: string;
    watchProviders?: string;
    includeCompanies?: string;
    includeNetworks?: string;
    language?: string;
}

const fetchDiscover = async (
    url: string,
    page?: number,
    sort?: string,
    filters?: Filters
) => {
    const {
        certification,
        releaseYear,
        releaseYearGreater,
        releaseYearLess,
        voteCountGreater,
        voteCountLess,
        ratingGreater,
        ratingLess,
        includeGenres,
        excludeGenres,
        includeKeywords,
        watchProviders,
        includeCompanies,
        language,
        includeNetworks
    } = filters;

    const {
        data
    }: { data: PopularMoviesAndPopularTVShows } = await tmdbFetch.get(url, {
        params: {
            sort_by: sort,
            page: page,
            certification: certification,
            primary_release_year: releaseYear,
            'primary_release_date.gte': releaseYearGreater,
            'primary_release_date.lte': releaseYearLess,
            'vote_count.gte': voteCountGreater,
            'vote_count.lte': voteCountLess,
            'vote_average.gte': ratingGreater,
            'vote_average.lte': ratingLess,
            with_genres: includeGenres,
            without_genres: excludeGenres,
            with_keywords: includeKeywords,
            with_watch_providers: watchProviders,
            with_original_language: language,
            with_companies: includeCompanies,
            with_networks: includeNetworks
        }
    });

    return data;
};

const useDiscover = (
    type: string,
    initialData?: PopularMoviesAndPopularTVShows,
    initialFilters?: Filters
) => {
    const [page, setPage] = useState(1);
    const [filters, setFilters] = useState<Filters>(initialFilters);
    const [sort, setSort] = useState('popularity.desc');

    const initialKey = [
        `/discover/${type}`,
        1,
        'popularity.desc',
        initialFilters
    ];
    const key = [`/discover/${type}`, page, sort, filters];

    const { data, error } = useSWR<PopularMoviesAndPopularTVShows>(
        key,
        fetchDiscover,
        { initialData: key === initialKey ? initialData : undefined }
    );

    useEffect(() => {
        console.log(page);
        console.log(data);
    }, [page, data]);

    return {
        data,
        page,
        sort,
        filters,
        setSort: (newSort: string) => setSort(newSort),
        setFilters: (newFilters: Filters) => setFilters(newFilters),
        setPage: (newPage: number) => setPage(newPage),
        isLoading: !data && !error,
        isError: error
    };
};

export default useDiscover;
