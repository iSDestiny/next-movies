import { useState } from 'react';
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
        language
    } = filters;

    const {
        data
    }: { data: PopularMoviesAndPopularTVShows } = await tmdbFetch.get(url, {
        params: {
            sort_by: sort,
            page,
            certification,
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
            with_original_language: language
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
    const { data, error } = useSWR<PopularMoviesAndPopularTVShows>(
        [`/discover/${type}`, page, sort, filters],
        fetchDiscover,
        { initialData }
    );

    return {
        data,
        page,
        setSort: (newSort: string) => setSort(newSort),
        setFilters: (newFilters: Filters) => setFilters(newFilters),
        setPage: (newPage: number) => setPage(newPage),
        isLoading: !data && !error,
        isError: error
    };
};

export default useDiscover;
