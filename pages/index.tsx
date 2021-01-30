import { GetStaticProps } from 'next';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import tmdbFetch from 'utils/tmdbFetch';
import { useEffect } from 'react';
import { Box, Flex, Heading } from '@chakra-ui/react';
import TrailerCarousel from 'components/TrailerCarousel';
import axios from 'axios';

interface HomeProps {
    trending: Trending;
    config: TMDBConfig;
    videos: Video[];
}

const Home = ({ trending, config, videos }: HomeProps) => {
    useEffect(() => {
        console.log(trending);
        console.log(config);
        console.log(videos);
    }, []);
    return (
        <>
            <Navbar />

            <Flex
                p="2rem 1rem"
                direction="column"
                maxWidth="1400px"
                margin="auto"
            >
                <Heading size="lg" as="h1" alignSelf="flex-start" mb="1rem">
                    Trending Today
                </Heading>
                <TrailerCarousel
                    results={trending.results}
                    config={config}
                    trailers={videos}
                />
                <Heading
                    size="lg"
                    as="h1"
                    alignSelf="flex-start"
                    mb="1rem"
                    my="1rem"
                >
                    Popular
                </Heading>
            </Flex>
        </>
    );
};

export const getStaticProps: GetStaticProps = async (context) => {
    let trending: Trending | null;
    let config: TMDBConfig | null;
    let videos: Video[] | null;

    try {
        const { data: trendingData }: { data: Trending } = await tmdbFetch.get(
            '/trending/all/day'
        );
        const { data: configData }: { data: TMDBConfig } = await tmdbFetch.get(
            '/configuration'
        );
        const videoRes = await Promise.all(
            trendingData.results.map(async ({ id, media_type }) => {
                if (media_type === 'movie')
                    return tmdbFetch.get(`/movie/${id}/videos`);
                else if (media_type === 'tv')
                    return tmdbFetch.get(`/tv/${id}/videos`);
            })
        );
        const videoData = videoRes.map(({ data }) => data);

        videos = videoData;
        trending = trendingData;
        config = configData;
    } catch (err) {
        console.log(err);
    }

    return {
        props: { trending, config, videos },
        revalidate: 3600
    };
};

export default Home;
