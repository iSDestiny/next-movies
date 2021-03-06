import { useEffect, useState } from 'react';
import useSWR from 'hooks/useSwr';
import axios from 'axios';
import isObjectNotNull from 'utils/isObjectNotNull';

// CONVERT TO LAMBDA TO AVOID EXPOSING API KEY

export interface Filters {
    certifications?: string[] | string;
    releaseYear?: number;
    releaseDateGreater?: string;
    releaseDateLess?: string;
    voteCountGreater?: number;
    voteCountLess?: number;
    ratingGreater?: number;
    ratingLess?: number;
    runtimeLess?: number;
    runtimeGreater?: number;
    includeGenres?: string[] | string;
    excludeGenres?: string[] | string;
    includeKeywords?: string[] | string;
    watchProviders?: number | string;
    includeCompanies?: number | string;
    includeNetworks?: number | string;
    language?: string;
}

const fetchDiscover = async (
    url: string,
    page?: number,
    sort?: string,
    filters?: Filters
) => {
    const {
        certifications,
        releaseYear,
        releaseDateGreater,
        releaseDateLess,
        voteCountGreater,
        voteCountLess,
        ratingGreater,
        ratingLess,
        runtimeGreater,
        runtimeLess,
        includeGenres,
        excludeGenres,
        includeKeywords,
        watchProviders,
        includeCompanies,
        language,
        includeNetworks
    } = filters;

    const convertArrayToString = (arr: string[] | string) => {
        if (Array.isArray(arr)) return arr.join(',');
        return arr;
    };

    const stringIncludeGenres = convertArrayToString(includeGenres);
    const stringExcludeGenres = convertArrayToString(excludeGenres);
    const stringKeywords = convertArrayToString(includeKeywords);
    const stringCertifications = convertArrayToString(certifications);

    const { data }: { data: PopularMoviesAndPopularTVShows } = await axios.get(
        url,
        {
            params: {
                page,
                sort_by: sort,
                certification: stringCertifications,
                certification_country: 'US',
                primary_release_year: releaseYear,
                'primary_release_date.gte': releaseDateGreater,
                'primary_release_date.lte': releaseDateLess,
                'first_air_date.gte': releaseDateGreater,
                'first_air_date.lte': releaseDateLess,
                'vote_count.gte': voteCountGreater,
                'vote_count.lte': voteCountLess,
                'vote_average.gte': ratingGreater,
                'vote_average.lte': ratingLess,
                'with_runtime.gte': runtimeGreater,
                'with_runtime.lte': runtimeLess,
                with_genres: stringIncludeGenres,
                without_genres: stringExcludeGenres,
                with_keywords: stringKeywords,
                with_watch_providers: watchProviders,
                with_original_language: language,
                with_companies: includeCompanies,
                with_networks: includeNetworks
            }
        }
    );

    return data;
};

const useDiscover = (
    type: string,
    initialData?: PopularMoviesAndPopularTVShows,
    initialFilters?: Filters,
    shouldFetch?: boolean
) => {
    const [page, setPage] = useState(1);
    const [filters, setFilters] = useState<Filters>(
        initialFilters ? initialFilters : {}
    );
    const [sort, setSort] = useState('popularity.desc');

    const key = [`/api/discover/${type}`, page, sort, filters];

    const { data, error } = useSWR<PopularMoviesAndPopularTVShows, any>(
        shouldFetch ? key : null,
        fetchDiscover,
        { initialData }
    );

    useEffect(() => {
        setFilters(initialFilters);
    }, [shouldFetch]);

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
