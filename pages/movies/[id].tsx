import { Flex } from '@chakra-ui/react';
import Navbar from 'components/Navbar';
import { GetStaticPaths, GetStaticProps } from 'next';
import React, { useEffect } from 'react';
import tmdbFetch from 'utils/tmdbFetch';
import tmdbFetchGzip from 'utils/tmdbFetchGzip';
import addLeadingZeroToDate from 'utils/addLeadingZeroToDate';
import { gzip, ungzip } from 'node-gzip';

interface MovieProps {
    movieData: MovieDetails;
    videos: VideoResultsEntity[];
    recommendations: Movie[];
    credits: Credits;
    keywords: Keyword[];
    images: Images;
}

const Movie = ({
    movieData,
    videos,
    recommendations,
    credits,
    keywords,
    images
}: MovieProps) => {
    useEffect(() => {
        console.log(movieData);
        console.log(videos);
        console.log(recommendations);
        console.log(credits);
        console.log(keywords);
        console.log(images);
    }, []);

    return (
        <>
            <Navbar />
            <Flex
                as="main"
                p="2rem 1rem"
                direction="column"
                maxWidth="1400px"
                margin="auto"
            ></Flex>
        </>
    );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const { id } = params;
    let movieData: MovieDetails;
    let config: TMDBConfig;
    let videos: VideoResultsEntity[];
    let recommendations: Movie[];
    let credits: Credits;
    let keywords: Keyword[];
    let images: Images;
    try {
        const { data: configData } = await tmdbFetch.get('/configuration');
        const {
            data: { results: videoData }
        } = await tmdbFetch.get(`/movie/${id}/videos`);
        const {
            data: { results: reccData }
        } = await tmdbFetch.get(`movie/${id}/recommendations`);
        const { data: creditsData } = await tmdbFetch.get(
            `movie/${id}/credits`
        );
        const {
            data: { keywords: keywordData }
        } = await tmdbFetch.get(`movie/${id}/keywords`);
        const { data: imageData } = await tmdbFetch.get(`movie/${id}/images`);
        const { data } = await tmdbFetch.get(`/movie/${id}`);
        config = configData;
        movieData = data;
        videos = videoData;
        recommendations = reccData;
        credits = creditsData;
        keywords = keywordData;
        images = imageData;
    } catch (err) {
        console.log(err);
    }

    return {
        props: {
            movieData,
            videos,
            config,
            recommendations,
            credits,
            keywords,
            images
        }
    };
};

export const getStaticPaths: GetStaticPaths = async () => {
    let ids: number[];
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
        fallback: false
    };
};

export default Movie;
