import {
    Box,
    Text,
    Flex,
    Heading,
    VStack,
    HStack,
    Tag,
    Divider,
    Icon,
    Button,
    DarkMode,
    Stack,
    useBreakpointValue,
    ButtonGroup
} from '@chakra-ui/react';
import Navbar from 'components/Navbar';
import { GetStaticPaths, GetStaticProps } from 'next';
import React, { useEffect, useState } from 'react';
import tmdbFetch from 'utils/tmdbFetch';
import tmdbFetchGzip from 'utils/tmdbFetchGzip';
import addLeadingZeroToDate from 'utils/addLeadingZeroToDate';
import { ungzip } from 'node-gzip';
import Image from 'next/image';
import DotDivider from 'components/DotDivider';
import { FaPlay, FaRegStar, FaStar } from 'react-icons/fa';
import VideoModal from 'components/VideoModal';
import ShowHeader from 'components/ShowHeader';
import CastCarousel from 'components/CastCarousel';
import ShowCarousel from 'components/ShowCarousel';
import ShowSideData from 'components/ShowSideData';
import Footer from 'components/Footer';
import GeneralLayout from 'layouts/GeneralLayout';
import MediaCarousel from 'components/MediaCarousel';

interface MovieProps {
    movieData: MovieDetails;
    config: TMDBConfig;
    languages: Language[];
}

const Movie = ({ movieData, config, languages }: MovieProps) => {
    const [currentCarousel, setCurrentCarousel] = useState(0);
    const noOfSlides = useBreakpointValue([3, 3, 4, 4, 5]);
    const naturalHeight = useBreakpointValue([2200, 2050, 2000, 2000, 2100]);
    const headingSize = useBreakpointValue({ base: 'sm', md: 'md', xl: 'lg' });
    const sideDataHeadingSize = useBreakpointValue({ base: 'sm', md: 'md' });
    const starSize = ['0.8rem', '0.9rem', '1rem', '1rem', '1.1rem'];
    const ratingSize = ['0.7rem', '0.8rem', '0.9rem', '0.9rem', '1rem'];
    const carouselHeadingSize = [
        '0.65rem',
        '0.75rem',
        '0.85rem',
        '0.85rem',
        '0.9rem'
    ];
    const { secure_base_url, poster_sizes, backdrop_sizes } = config.images;
    const {
        title,
        genres,
        backdrop_path,
        poster_path,
        release_date,
        revenue,
        original_language,
        budget,
        status,
        keywords: { keywords },
        production_countries,
        tagline,
        overview,
        vote_average,
        vote_count,
        runtime,
        videos: { results: videos },
        recommendations: { results: recommendations },
        credits,
        images,
        similar: { results: similar },
        reviews: { results: reviews },
        release_dates: { results: release_dates }
    } = movieData;
    const certification = release_dates.find(
        ({ iso_3166_1 }) =>
            iso_3166_1 === 'US' ||
            iso_3166_1 === production_countries[0].iso_3166_1
    )?.release_dates[0].certification;
    const posters: Media[] =
        images && images.posters
            ? images.posters.map(({ file_path }) => ({
                  path: `${secure_base_url}${poster_sizes[2]}${file_path}`,
                  original: `${secure_base_url}${poster_sizes[6]}${file_path}`
              }))
            : [];
    const backdrops: Media[] =
        images && images.posters
            ? images.backdrops.map(({ file_path }) => ({
                  path: `${secure_base_url}${backdrop_sizes[1]}${file_path}`,
                  original: `${secure_base_url}${backdrop_sizes[3]}${file_path}`
              }))
            : [];

    const media = [
        { items: backdrops, width: 533, height: 300, noOfSlides: 2 },
        { items: posters, width: 185, height: 276, noOfSlides: 5 }
    ];

    useEffect(() => {
        console.log(movieData);
        console.log(config);
        console.log(languages);
    }, []);

    return (
        <GeneralLayout title={title}>
            <Box as="main">
                <ShowHeader
                    {...{
                        title,
                        config,
                        release_date,
                        certification,
                        runtime,
                        overview,
                        videos,
                        genres,
                        poster_path,
                        backdrop_path,
                        vote_average,
                        vote_count,
                        tagline
                    }}
                />

                <Stack
                    as="main"
                    p="2rem 1rem"
                    maxWidth="1400px"
                    margin="auto"
                    spacing={{ base: 0, lg: '1.5rem' }}
                    align="flex-start"
                    direction={{ base: 'column', lg: 'row' }}
                >
                    <VStack width={{ base: '100%', lg: '80%' }}>
                        <CastCarousel
                            cast={credits.cast}
                            config={config}
                            headingSize={headingSize}
                        />

                        {/* {posters.length > 0 && ( */}
                        <VStack
                            spacing="1rem"
                            width="100%"
                            align="flex-start"
                            mb="1rem"
                        >
                            <HStack justify="flex-start" spacing="1.5rem">
                                <Heading size={headingSize}>Media</Heading>
                                <ButtonGroup size="md" isAttached>
                                    {['Backdrops', 'Posters'].map(
                                        (name, index) => (
                                            <Button
                                                key={name}
                                                colorScheme="teal"
                                                variant={
                                                    index === currentCarousel
                                                        ? 'solid'
                                                        : 'outline'
                                                }
                                                onClick={() =>
                                                    setCurrentCarousel(index)
                                                }
                                            >
                                                {name}
                                            </Button>
                                        )
                                    )}
                                </ButtonGroup>
                            </HStack>
                            <MediaCarousel
                                naturalHeight={media[currentCarousel].height}
                                naturalWidth={media[currentCarousel].width}
                                name={title}
                                items={media[currentCarousel].items}
                                noOfSlides={media[currentCarousel].noOfSlides}
                                buttonSize={['1rem', '1.5rem', '2rem']}
                            />
                        </VStack>
                        {/* )} */}
                        {/* {backdrops.length > 0 && (
                            <VStack
                                spacing="1rem"
                                width="100%"
                                align="flex-start"
                                mb="1rem"
                            >
                                <Heading size={headingSize}>Media</Heading>
                                <MediaCarousel
                                    naturalHeight={300}
                                    naturalWidth={533}
                                    name={title}
                                    items={backdrops}
                                    noOfSlides={2}
                                    buttonSize={['1rem', '1.5rem', '2rem']}
                                />
                            </VStack>
                        )} */}
                        {recommendations.length > 0 && (
                            <VStack
                                spacing="1rem"
                                width="100%"
                                align="flex-start"
                                mb="1rem"
                            >
                                <Heading size={headingSize}>
                                    Recommendations
                                </Heading>
                                <ShowCarousel
                                    name="Recommendations"
                                    items={recommendations}
                                    base_url={secure_base_url}
                                    poster_sizes={poster_sizes}
                                    noOfSlides={noOfSlides}
                                    naturalHeight={naturalHeight}
                                    buttonSize={['1rem', '1.5rem', '2rem']}
                                    starSize={starSize}
                                    headingSize={carouselHeadingSize}
                                    ratingSize={ratingSize}
                                />
                            </VStack>
                        )}
                        {similar.length > 0 && (
                            <VStack
                                spacing="1rem"
                                width="100%"
                                align="flex-start"
                                mb="1rem"
                            >
                                <Heading size={headingSize}>Similar</Heading>
                                <ShowCarousel
                                    name="Recommendations"
                                    items={similar}
                                    base_url={secure_base_url}
                                    poster_sizes={poster_sizes}
                                    noOfSlides={noOfSlides}
                                    naturalHeight={naturalHeight}
                                    buttonSize={['1rem', '1.5rem', '2rem']}
                                    starSize={starSize}
                                    headingSize={carouselHeadingSize}
                                    ratingSize={ratingSize}
                                />
                            </VStack>
                        )}
                    </VStack>
                    <VStack
                        width={{ base: '100%', lg: '20%' }}
                        spacing="2rem"
                        align="flex-start"
                    >
                        <ShowSideData
                            headingSize={sideDataHeadingSize}
                            status={status}
                            origLanguage={
                                languages.find(
                                    ({ iso_639_1 }) =>
                                        iso_639_1 === original_language
                                ).english_name
                            }
                            budget={budget}
                            revenue={revenue}
                            keywords={keywords}
                        />
                    </VStack>
                </Stack>
            </Box>
        </GeneralLayout>
    );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const { id } = params;
    let movieData: MovieDetails;
    let config: TMDBConfig;
    let languages: Language[];
    // let videos: VideoResultsEntity[];
    // let recommendations: Movie[];
    // let credits: Credits;
    // let keywords: Keyword[];
    // let images: Images;
    try {
        const { data: configData } = await tmdbFetch.get('/configuration');
        const { data: languageData } = await tmdbFetch.get(
            '/configuration/languages'
        );
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
        languages = languageData;
    } catch (err) {
        console.log(err);
    }

    return {
        props: {
            movieData,
            config,
            languages
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
