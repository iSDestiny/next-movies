import useDiscover from 'hooks/useDiscover';
import GeneralLayout from 'layouts/GeneralLayout';
import SpecficFilterLayout from 'layouts/SpecficFilterLayout';
import SpecificFilterFallbackSkeleton from 'layouts/SpecificFilterLayoutSkeleton';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import getAllShowPropertyIds from 'utils/getAllShowPropertyIds';
import getAllFetchResponseResultIds from 'utils/getAllFetchResponseResultIds';
import tmdbFetch from 'utils/tmdbFetch';

interface CompanyProps {
    company: ProductionCompanyDetails;
    movies: PopularMovies;
    tvShows: PopularTVShows;
    config: TMDBConfig;
}

const Company = ({ company, movies, tvShows, config }: CompanyProps) => {
    const router = useRouter();
    const movieCategory = useDiscover(
        'movie',
        movies as PopularMoviesAndPopularTVShows,
        { includeCompanies: company?.id },
        Boolean(company?.id)
    );
    const tvShowCategory = useDiscover(
        'tv',
        tvShows as PopularMoviesAndPopularTVShows,
        { includeCompanies: company?.id },
        Boolean(company?.id)
    );

    const categories = [movieCategory, tvShowCategory];

    useEffect(() => {
        console.log(company);
        console.log(categories);
    }, []);

    if (router.isFallback)
        return (
            <GeneralLayout title="Loading company movies and shows...">
                <SpecificFilterFallbackSkeleton type="company" />;
            </GeneralLayout>
        );

    return (
        <GeneralLayout title={`Movies and Shows by "${company.name}"`}>
            <SpecficFilterLayout
                type="company"
                config={config}
                heading={company.name}
                categories={categories}
                company={company}
            />
        </GeneralLayout>
    );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const { id } = params;
    let movies: PopularMovies;
    let tvShows: PopularTVShows;
    let config: TMDBConfig;
    let company: ProductionCompanyDetails;

    try {
        const { data: configData } = await tmdbFetch.get('/configuration');
        const { data: tvData } = await tmdbFetch.get('/discover/tv', {
            params: {
                with_companies: id
            }
        });
        const { data: movieData } = await tmdbFetch.get('/discover/movie', {
            params: {
                with_companies: id
            }
        });
        const {
            data: companyData
        }: { data: ProductionCompanyDetails } = await tmdbFetch.get(
            `/company/${id}`
        );

        config = configData;
        movies = movieData;
        tvShows = tvData;
        company = companyData;

        return {
            props: {
                company,
                movies,
                tvShows,
                config
            }
        };
    } catch (err) {
        return {
            notFound: true
        };
    }
};

export const getStaticPaths: GetStaticPaths = async () => {
    const relevantMovieCompanyIds = await getAllShowPropertyIds<
        Movie,
        NetworksEntityOrProductionCompaniesEntity
    >(
        [
            '/movie/popular',
            '/movie/top_rated',
            '/movie/upcoming',
            '/movie/now_playing',
            '/trending/movie/week'
        ],
        'movie',
        'production_companies'
    );

    const relevantTVCompanyIds = await getAllShowPropertyIds<
        TVShow,
        NetworksEntityOrProductionCompaniesEntity
    >(
        [
            '/tv/popular',
            '/tv/top_rated',
            '/tv/on_the_air',
            '/tv/airing_today',
            '/trending/tv/week'
        ],
        'tv',
        'production_companies'
    );

    const relevantCompanyIds = [
        ...new Set([...relevantMovieCompanyIds, ...relevantTVCompanyIds])
    ];

    const paths = relevantCompanyIds.map((id) => {
        if (id) return { params: { id: id + '' } };
        console.log('error' + id);
        return { params: { id: null } };
    });

    return {
        paths,
        fallback: true
    };
};

export default Company;
