import useDiscover from 'hooks/useDiscover';
import GeneralLayout from 'layouts/GeneralLayout';
import SpecficFilterLayout from 'layouts/SpecficFilterLayout';
import { GetStaticPaths, GetStaticProps } from 'next';
import { ungzip } from 'node-gzip';
import React, { useEffect } from 'react';
import addLeadingZeroToDate from 'utils/addLeadingZeroToDate';
import tmdbFetch from 'utils/tmdbFetch';
import tmdbFetchGzip from 'utils/tmdbFetchGzip';

interface CompanyProps {
    company: ProductionCompanyDetails;
    movies: PopularMovies;
    tvShows: PopularTVShows;
    config: TMDBConfig;
}

const Company = ({ company, movies, tvShows, config }: CompanyProps) => {
    const movieCategory = useDiscover(
        'movie',
        movies as PopularMoviesAndPopularTVShows,
        { includeCompanies: company.id + '' }
    );
    const tvShowCategory = useDiscover(
        'tv',
        tvShows as PopularMoviesAndPopularTVShows,
        { includeCompanies: company.id + '' }
    );

    const categories = [movieCategory, tvShowCategory];

    useEffect(() => {
        console.log(company);
        console.log(categories);
    }, []);

    return (
        <GeneralLayout title={`Keyword: "${company.name}"`}>
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
    let ids: number[];
    const date = new Date();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    const res = await tmdbFetchGzip.get(
        `/production_company_ids_${addLeadingZeroToDate(
            month
        )}_${addLeadingZeroToDate(day)}_${year}.json.gz`,
        {
            responseType: 'arraybuffer',
            headers: {
                'Accept-Encoding': 'gzip'
            }
        }
    );

    const uncompressed = await ungzip(res.data);
    ids = uncompressed
        .toString()
        .trim()
        .split('\n')
        .map((line) => {
            const json = JSON.parse(line);
            return json.id;
        });

    const paths = ids.map((id) => {
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
