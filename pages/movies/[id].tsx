import {
    Box,
    Text,
    Flex,
    Heading,
    VStack,
    HStack,
    Tag,
    Divider
} from '@chakra-ui/react';
import Navbar from 'components/Navbar';
import { GetStaticPaths, GetStaticProps } from 'next';
import React, { useEffect } from 'react';
import tmdbFetch from 'utils/tmdbFetch';
import tmdbFetchGzip from 'utils/tmdbFetchGzip';
import addLeadingZeroToDate from 'utils/addLeadingZeroToDate';
import { ungzip } from 'node-gzip';
import Image from 'next/image';
import DotDivider from 'components/DotDivider';

interface MovieProps {
    movieData: MovieDetails;
    config: TMDBConfig;
}

const Movie = ({ movieData, config }: MovieProps) => {
    const { base_url, poster_sizes, backdrop_sizes } = config.images;
    const {
        title,
        genres,
        backdrop_path,
        poster_path,
        release_date,
        status,
        vote_average,
        vote_count,
        runtime,
        videos: { results: videos },
        recommendations: { results: recommendations },
        credits,
        keywords: { keywords },
        images,
        similar: { results: similar },
        reviews: { results: reviews },
        release_dates: { results: release_dates }
    } = movieData;

    const certification = release_dates.find(
        ({ iso_3166_1 }) => iso_3166_1 === 'US'
    )?.release_dates[0].certification;

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
            <Box as="main" width="100%" position="relative">
                <Image
                    alt={`${title} backdrop`}
                    src={`${base_url}${backdrop_sizes[3]}${backdrop_path}`}
                    layout="fill"
                    objectFit="cover"
                    objectPosition="200px 0%"
                />
                <Box
                    position="absolute"
                    zIndex="0"
                    width="100%"
                    height="100%"
                    bgGradient="linear(to-r, rgba(0,0,0,1) 200px, rgba(0,0,0,0.84))"
                />
                <HStack
                    p="2rem 1rem"
                    zIndex="2"
                    maxWidth="1400px"
                    margin="auto"
                    padding="1.5rem 2rem"
                    position="relative"
                    justify="flex-start"
                    align="center"
                    spacing="2rem"
                >
                    <Box borderRadius="10px">
                        <Image
                            className="border-round"
                            src={`${base_url}${poster_sizes[3]}${poster_path}`}
                            alt={`${title} poster`}
                            width={300}
                            height={450}
                        />
                    </Box>
                    <VStack
                        zIndex="2"
                        justify="flex-start"
                        align="flex-start"
                        py="2.5rem"
                        spacing="1rem"
                    >
                        <Box>
                            <Heading as="h1" color="white" size="lg" mb="3px">
                                {`${title} `}
                                <Text
                                    as="span"
                                    fontWeight="400"
                                    color="gray.300"
                                >{`(${release_date.slice(0, 4)})`}</Text>
                            </Heading>
                            <HStack spacing="0.5rem" color="white">
                                <Text border="1px solid white" px="4px">
                                    {certification}
                                </Text>
                                <Text>{release_date}</Text>
                                <DotDivider size="5px" color="white" />
                                <HStack spacing="0.3rem">
                                    {genres.map(({ id, name }, index) => (
                                        <Tag size="sm" key={id}>
                                            {name}
                                        </Tag>
                                    ))}
                                </HStack>
                                <DotDivider size="5px" color="white" />
                                <Text>
                                    {`${Math.floor(runtime / 60)}H ${
                                        runtime - Math.floor(runtime / 60) * 60
                                    }M`}
                                </Text>
                            </HStack>
                        </Box>
                    </VStack>
                </HStack>
            </Box>
        </>
    );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const { id } = params;
    let movieData: MovieDetails;
    let config: TMDBConfig;
    // let videos: VideoResultsEntity[];
    // let recommendations: Movie[];
    // let credits: Credits;
    // let keywords: Keyword[];
    // let images: Images;
    try {
        const { data: configData } = await tmdbFetch.get('/configuration');
        // const {
        //     data: { results: videoData }
        // } = await tmdbFetch.get(`/movie/${id}/videos`);
        // const {
        //     data: { results: reccData }
        // } = await tmdbFetch.get(`movie/${id}/recommendations`);
        // const { data: creditsData } = await tmdbFetch.get(
        //     `movie/${id}/credits`
        // );
        // const {
        //     data: { keywords: keywordData }
        // } = await tmdbFetch.get(`movie/${id}/keywords`);
        // const { data: imageData } = await tmdbFetch.get(`movie/${id}/images`);
        const { data } = await tmdbFetch.get(`/movie/${id}`, {
            params: {
                append_to_response:
                    'release_dates,reviews,similar,images,credits,videos,recommendations,keywords'
            }
        });
        config = configData;
        movieData = data;
    } catch (err) {
        console.log(err);
    }

    return {
        props: {
            movieData,
            config
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
