import { GetStaticProps } from 'next';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import tmdbFetch from 'utils/tmdbFetch';
import { useEffect } from 'react';
import { Box, Flex, Heading, useBreakpointValue } from '@chakra-ui/react';
import TrailerCarousel from 'components/TrailerCarousel';
import axios from 'axios';
import ShowCarousel from 'components/ShowCarousel';
import HomeSection from 'components/HomeSection';
import Footer from 'components/Footer';
import tmdbFetchGzip from 'utils/tmdbFetchGzip';
import addLeadingZeroToDate from 'utils/addLeadingZeroToDate';
import { ungzip } from 'node-gzip';
import GeneralLayout from 'layouts/GeneralLayout';

interface HomeProps {
    trending: Trending;
    config: TMDBConfig;
    videos: Videos[];
    popularMovies: Movie[];
    popularTVShows: TVShow[];
    topRatedMovies: Movie[];
    topRatedTVShows: TVShow[];
    upcomingMovies: Movie[];
    nowPlayingMovies: Movie[];
    airingTodayTVShows: TVShow[];
    onTheAirTVShows: TVShow[];
    uncompressed?: string;
}

const Home = ({
    trending,
    config,
    videos,
    popularTVShows,
    popularMovies,
    topRatedMovies,
    topRatedTVShows,
    upcomingMovies,
    nowPlayingMovies,
    airingTodayTVShows,
    onTheAirTVShows,
    uncompressed
}: HomeProps) => {
    const headingSize = useBreakpointValue(['sm', 'md', 'lg']);
    useEffect(() => {
        console.log(trending);
        console.log(config);
        console.log(videos);
        console.log(popularTVShows);
        console.log(popularMovies);
        console.log(topRatedMovies);
        console.log(nowPlayingMovies);
        console.log(airingTodayTVShows);
        const lines = uncompressed.trim().split('\n');
        const json = lines.map((line) => {
            try {
                return JSON.parse(line).id;
            } catch (err) {
                console.log('err');
                return 'err';
            }
        });
        console.log(json);
    }, []);
    return (
        <GeneralLayout title="Home">
            <Flex
                as="main"
                p="2rem 1rem"
                direction="column"
                maxWidth="1400px"
                margin="auto"
            >
                <section>
                    <Heading
                        size={headingSize}
                        alignSelf="flex-start"
                        mb="1rem"
                    >
                        Trending
                    </Heading>
                    <TrailerCarousel
                        results={trending.results}
                        config={config}
                        trailers={videos}
                    />
                </section>
                <HomeSection
                    heading="Popular"
                    config={config}
                    carousels={[
                        { name: 'Movies', items: popularMovies },
                        { name: 'TV', items: popularTVShows }
                    ]}
                />
                <HomeSection
                    heading="Top Rated"
                    config={config}
                    carousels={[
                        { name: 'Movies', items: topRatedMovies },
                        { name: 'TV', items: topRatedTVShows }
                    ]}
                />
                <HomeSection
                    heading="Explore Movies"
                    config={config}
                    carousels={[
                        { name: 'Now Playing', items: nowPlayingMovies },
                        { name: 'Upcoming', items: upcomingMovies }
                    ]}
                />
                <HomeSection
                    heading="Explore TV Shows"
                    config={config}
                    carousels={[
                        { name: 'Airing Today', items: airingTodayTVShows },
                        { name: 'Airing This Week', items: onTheAirTVShows }
                    ]}
                />
            </Flex>
        </GeneralLayout>
    );
};

export const getStaticProps: GetStaticProps = async (context) => {
    let trending: Trending | null;
    let upcomingMovies: Movie[] | null;
    let nowPlayingMovies: Movie[] | null;
    let airingTodayTVShows: TVShow[] | null;
    let onTheAirTVShows: TVShow[] | null;
    let popularMovies: Movie[] | null;
    let popularTVShows: TVShow[] | null;
    let topRatedMovies: Movie[] | null;
    let topRatedTVShows: TVShow[] | null;
    let config: TMDBConfig | null;
    let videos: Videos[] | null;

    try {
        const { data: trendingData } = await tmdbFetch.get('/trending/all/day');
        const { data: configData } = await tmdbFetch.get('/configuration');
        const {
            data: { results: upcomingMovieData }
        } = await tmdbFetch.get('/movie/upcoming');
        const {
            data: { results: nowPlayingMovieData }
        } = await tmdbFetch.get('/movie/now_playing');
        const {
            data: { results: onTheAirTVShowData }
        } = await tmdbFetch.get('/tv/on_the_air');
        const {
            data: { results: airingTodayTVShowData }
        } = await tmdbFetch.get('/tv/airing_today');
        const {
            data: { results: popularMovieData }
        } = await tmdbFetch.get('/movie/popular');
        const {
            data: { results: popularTVShowData }
        } = await tmdbFetch.get('/tv/popular');
        const {
            data: { results: topRatedMovieData }
        } = await tmdbFetch.get('/movie/top_rated');
        const {
            data: { results: topRatedTVShowData }
        } = await tmdbFetch.get('/tv/top_rated');
        const videoRes = await Promise.all(
            trendingData.results.map(async ({ id, media_type }) => {
                if (media_type === 'movie')
                    return tmdbFetch.get(`/movie/${id}/videos`);
                else if (media_type === 'tv')
                    return tmdbFetch.get(`/tv/${id}/videos`);
            })
        );
        const videoData = videoRes.map(({ data }) => data);

        upcomingMovies = upcomingMovieData;
        nowPlayingMovies = nowPlayingMovieData;
        airingTodayTVShows = airingTodayTVShowData;
        onTheAirTVShows = onTheAirTVShowData;
        popularMovies = popularMovieData;
        popularTVShows = popularTVShowData;
        topRatedMovies = topRatedMovieData;
        topRatedTVShows = topRatedTVShowData;
        videos = videoData;
        trending = trendingData;
        config = configData;
    } catch (err) {
        console.log(err);
    }

    const date = new Date();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    const res = await tmdbFetchGzip.get(
        `/movie_ids_${addLeadingZeroToDate(month)}_${addLeadingZeroToDate(
            day
        )}_${year}.json.gz`,
        {
            responseType: 'arraybuffer',
            headers: {
                'Accept-Encoding': 'gzip',
                'Content-Encoding': 'gzip'
                // 'Transfer-Encoding': 'gzip'
            }
        }
    );

    const uncompressed = await ungzip(res.data);
    // console.log(uncompressed.toString());

    return {
        props: {
            trending,
            config,
            videos,
            popularMovies,
            popularTVShows,
            topRatedMovies,
            topRatedTVShows,
            upcomingMovies,
            nowPlayingMovies,
            airingTodayTVShows,
            onTheAirTVShows,
            uncompressed: uncompressed.toString()
        },
        revalidate: 3600
    };
};

export default Home;
