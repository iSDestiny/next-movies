import { Flex, Heading, useBreakpointValue } from '@chakra-ui/react';
import HomeSection from 'components/HomeSection';
import TrailerCarousel from 'components/TrailerCarousel';
import GeneralLayout from 'layouts/GeneralLayout';
import { GetStaticProps } from 'next';
import tmdbFetch from 'utils/tmdbFetch';

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
    onTheAirTVShows
}: HomeProps) => {
    const headingSize = useBreakpointValue(['sm', 'md', 'lg']);

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
                        results={trending?.results}
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
    let trending: Trending | null = null;
    let upcomingMovies: Movie[] | null = null;
    let nowPlayingMovies: Movie[] | null = null;
    let airingTodayTVShows: TVShow[] | null = null;
    let onTheAirTVShows: TVShow[] | null = null;
    let popularMovies: Movie[] | null = null;
    let popularTVShows: TVShow[] | null = null;
    let topRatedMovies: Movie[] | null = null;
    let topRatedTVShows: TVShow[] | null = null;
    let config: TMDBConfig | null = null;
    let videos: Videos[] | null = null;

    const { data: trendingData } = await tmdbFetch.get('/trending/all/day');
    trending = trendingData;

    const videoRes = (await Promise.allSettled(
        trendingData.results.map(async ({ id, media_type }) => {
            if (media_type === 'movie')
                return tmdbFetch.get(`/movie/${id}/videos`);
            else if (media_type === 'tv')
                return tmdbFetch.get(`/tv/${id}/videos`);
        })
    )) as any;
    const videoData = videoRes.map(({ status, value }) =>
        status === 'fulfilled' ? value.data : null
    );
    videos = videoData;

    const { data: configData } = await tmdbFetch.get('/configuration');
    config = configData;

    const {
        data: { results: upcomingMovieData }
    } = await tmdbFetch.get('/movie/upcoming');
    upcomingMovies = upcomingMovieData;

    const {
        data: { results: nowPlayingMovieData }
    } = await tmdbFetch.get('/movie/now_playing');
    nowPlayingMovies = nowPlayingMovieData;

    const {
        data: { results: onTheAirTVShowData }
    } = await tmdbFetch.get('/tv/on_the_air');
    onTheAirTVShows = onTheAirTVShowData;

    const {
        data: { results: airingTodayTVShowData }
    } = await tmdbFetch.get('/tv/airing_today');
    airingTodayTVShows = airingTodayTVShowData;

    const {
        data: { results: popularMovieData }
    } = await tmdbFetch.get('/movie/popular');
    popularMovies = popularMovieData;

    const {
        data: { results: popularTVShowData }
    } = await tmdbFetch.get('/tv/popular');
    const {
        data: { results: topRatedMovieData }
    } = await tmdbFetch.get('/movie/top_rated');
    const {
        data: { results: topRatedTVShowData }
    } = await tmdbFetch.get('/tv/top_rated');

    popularTVShows = popularTVShowData;
    topRatedMovies = topRatedMovieData;
    topRatedTVShows = topRatedTVShowData;
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
            onTheAirTVShows
        },
        revalidate: 3600
    };
};

export default Home;
