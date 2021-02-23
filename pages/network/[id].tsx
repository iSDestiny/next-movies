import useDiscover from 'hooks/useDiscover';
import GeneralLayout from 'layouts/GeneralLayout';
import SpecficFilterLayout from 'layouts/SpecficFilterLayout';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { ungzip } from 'node-gzip';
import React, { useEffect } from 'react';
import addLeadingZeroToDate from 'utils/addLeadingZeroToDate';
import tmdbFetch from 'utils/tmdbFetch';
import tmdbFetchGzip from 'utils/tmdbFetchGzip';

interface NetworkProps {
    network: ProductionCompanyDetails;
    movies: PopularMovies;
    tvShows: PopularTVShows;
    config: TMDBConfig;
}

const Network = ({ network, movies, tvShows, config }: NetworkProps) => {
    const router = useRouter();

    if (router.isFallback) return <div>Loading...</div>;

    const movieCategory = useDiscover(
        'movie',
        movies as PopularMoviesAndPopularTVShows,
        { includeNetworks: network.id + '' }
    );
    const tvShowCategory = useDiscover(
        'tv',
        tvShows as PopularMoviesAndPopularTVShows,
        { includeNetworks: network.id + '' }
    );

    const categories = [movieCategory, tvShowCategory];

    useEffect(() => {
        console.log(network);
        console.log(categories);
    }, []);

    return (
        <GeneralLayout title={`Keyword: "${network.name}"`}>
            <SpecficFilterLayout
                type="company"
                config={config}
                heading={network.name}
                categories={categories}
                company={network}
            />
        </GeneralLayout>
    );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const { id } = params;
    let movies: PopularMovies;
    let tvShows: PopularTVShows;
    let config: TMDBConfig;
    let network: ProductionCompanyDetails;

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
            `/network/${id}`
        );

        config = configData;
        movies = movieData;
        tvShows = tvData;
        network = companyData;

        if (!network) throw new Error('network is null');

        return {
            props: {
                network,
                movies,
                tvShows,
                config
            },
            revalidate: 3600
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
    date.setDate(date.getDate() - 2);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    const res = await tmdbFetchGzip.get(
        `/tv_network_ids_${addLeadingZeroToDate(month)}_${addLeadingZeroToDate(
            day
        )}_${year}.json.gz`,
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

    const {
        data: { results: popularTVShowData }
    }: ResponseWithResults<TVShow> = await tmdbFetch.get('/tv/popular');

    const {
        data: { results: topRatedTVShowData }
    }: ResponseWithResults<TVShow> = await tmdbFetch.get('/tv/top_rated');

    const {
        data: { results: onTheAirTVShowData }
    }: ResponseWithResults<TVShow> = await tmdbFetch.get('/tv/on_the_air');

    const {
        data: { results: airingTodayTVShowData }
    }: ResponseWithResults<TVShow> = await tmdbFetch.get('/tv/airing_today');

    const {
        data: { results: trendingData }
    }: ResponseWithResults<TVShow> = await tmdbFetch.get('/trending/tv/week');

    const relevantTVData = [
        ...popularTVShowData,
        ...topRatedTVShowData,
        ...onTheAirTVShowData,
        ...airingTodayTVShowData,
        ...trendingData
    ];
    const relevantTVIds = [...new Set(relevantTVData.map(({ id }) => id))];
    const relevantTVDetailsRes = (await Promise.allSettled(
        relevantTVIds.map((id) => {
            return tmdbFetch.get(`/tv/${id}`);
        })
    )) as any;

    const relevantNetworks = relevantTVDetailsRes.map(
        ({
            status,
            value
        }: {
            status: string;
            value: { data: TVShowDetails };
        }) => (status === 'fulfilled' ? value.data.networks : null)
    ) as NetworksEntity[];
    const relevantNetworkIds = new Set(
        relevantNetworks.flat().map(({ id }) => id)
    );
    ids = ids.filter((id) => relevantNetworkIds.has(id));

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

export default Network;
