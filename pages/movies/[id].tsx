import {
    Box,
    Heading,
    Stack,
    Text,
    useBreakpointValue,
    VStack
} from '@chakra-ui/react';
import CastCarousel from 'components/CastCarousel';
import MediaGroup, { MediaGroupItem } from 'components/MediaGroup';
import ShowCarousel from 'components/ShowCarousel';
import ShowHeader from 'components/ShowHeader';
import ShowSideData from 'components/ShowSideData';
import GeneralLayout from 'layouts/GeneralLayout';
import ShowPageSkeleton from 'layouts/ShowPageSkeleton.tsx';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import getAllFetchResponseResultIds from 'utils/getAllFetchResponseResultIds';
import tmdbFetch from 'utils/tmdbFetch';
interface MovieProps {
    movieData: MovieDetails;
    config: TMDBConfig;
    languages: Language[];
}

const Movie = ({ movieData, config, languages }: MovieProps) => {
    const router = useRouter();
    const noOfSlides = useBreakpointValue([3, 3, 4, 4, 5]);
    const backdropSlides = useBreakpointValue({ base: 1, sm: 2 });
    const naturalHeight = useBreakpointValue([2200, 2050, 2000, 2000, 2100]);
    const headingSize = useBreakpointValue({ base: 'sm', md: 'md', xl: 'lg' });
    const sideDataHeadingSize = useBreakpointValue({ base: 'sm', md: 'md' });
    const buttonSize = ['1rem', '1.5rem', '2rem'];
    const starSize = ['0.8rem', '0.9rem', '1rem', '1rem', '1.1rem'];
    const ratingSize = ['0.7rem', '0.8rem', '0.9rem', '0.9rem', '1rem'];
    const carouselHeadingSize = [
        '0.65rem',
        '0.75rem',
        '0.85rem',
        '0.85rem',
        '0.9rem'
    ];
    const { secure_base_url, poster_sizes, backdrop_sizes } =
        config?.images || {};
    const {
        title,
        original_title,
        genres,
        backdrop_path,
        poster_path,
        release_date,
        revenue,
        original_language,
        budget,
        status,
        keywords: { keywords = [] as GenresEntityOrKeywordsEntity[] } = {},
        production_countries,
        tagline,
        overview,
        vote_average,
        vote_count,
        runtime,
        videos: { results: videos = [] as VideoResultsEntity[] } = {},
        recommendations: {
            results: recommendations = [] as ResultsEntity2[]
        } = {},
        credits,
        images,
        similar: { results: similar = [] as ResultsEntity2[] } = {},
        reviews: { results: reviews = [] as ResultsEntity1[] } = {},
        release_dates: { results: release_dates = [] as ResultsEntity[] } = {}
    } = movieData || {};
    const certification = release_dates?.find(
        ({ iso_3166_1 }) =>
            iso_3166_1 === 'US' ||
            iso_3166_1 === production_countries[0]?.iso_3166_1
    )?.release_dates[0].certification;
    const posters: Media[] = images?.posters
        ? images.posters.map(({ file_path }) => ({
              path: `${secure_base_url}${poster_sizes[2]}${file_path}`,
              original: `${secure_base_url}${poster_sizes[6]}${file_path}`
          }))
        : [];
    const backdrops: Media[] = images?.backdrops
        ? images.backdrops.map(({ file_path }) => ({
              path: `${secure_base_url}${backdrop_sizes[1]}${file_path}`,
              original: `${secure_base_url}${backdrop_sizes[3]}${file_path}`
          }))
        : [];

    const media: MediaGroupItem[] = [
        {
            type: 'backdrop',
            items: backdrops,
            width: 533,
            height: 300,
            noOfSlides: backdropSlides
        },
        { type: 'poster', items: posters, width: 185, height: 276, noOfSlides },
        {
            type: 'video',
            items: videos,
            width: 533,
            height: 300,
            noOfSlides: backdropSlides
        }
    ];
    const origLanguage = languages?.find(
        ({ iso_639_1 }) => iso_639_1 === original_language
    ).english_name;
    const sideDataItems = [
        { heading: 'Original Title', data: original_title },
        { heading: 'Status', data: status },
        { heading: 'Original Language', data: origLanguage },
        { heading: 'Budget', data: budget, isDollar: true },
        { heading: 'Revenue', data: revenue, isDollar: true }
    ];

    useEffect(() => {
        console.log(movieData);
        console.log(config);
        console.log(languages);
    }, []);

    if (router.isFallback) return <ShowPageSkeleton />;

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
                            buttonSize={buttonSize}
                            cast={credits.cast}
                            config={config}
                            headingSize={headingSize}
                            type="movie"
                        />
                        <MediaGroup
                            headingSize={headingSize}
                            media={media}
                            title={title}
                        />
                        <VStack
                            spacing="1rem"
                            width="100%"
                            align="flex-start"
                            mb="1rem"
                        >
                            <Heading size={headingSize}>
                                Recommendations
                            </Heading>

                            {recommendations.length > 0 ? (
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
                            ) : (
                                <Text size="lg">No recommendations found</Text>
                            )}
                        </VStack>
                        <VStack
                            spacing="1rem"
                            width="100%"
                            align="flex-start"
                            pb="1rem"
                        >
                            <Heading size={headingSize}>Similar</Heading>

                            {similar.length > 0 ? (
                                <ShowCarousel
                                    name="Similar"
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
                            ) : (
                                <Text size="lg">No similar movies found</Text>
                            )}
                        </VStack>
                    </VStack>
                    <VStack
                        width={{ base: '100%', lg: '20%' }}
                        spacing="2rem"
                        align="flex-start"
                    >
                        <ShowSideData
                            headingSize={sideDataHeadingSize}
                            items={sideDataItems}
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

    try {
        const { data: configData } = await tmdbFetch.get('/configuration');
        const { data: languageData } = await tmdbFetch.get(
            '/configuration/languages'
        );

        const { data } = await tmdbFetch.get(`/movie/${id}`, {
            params: {
                append_to_response:
                    'release_dates,reviews,similar,images,credits,videos,recommendations,keywords'
            }
        });

        config = configData;
        movieData = data;
        languages = languageData;

        return {
            props: {
                movieData,
                config,
                languages
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
    const ids = await getAllFetchResponseResultIds<Movie>([
        '/movie/popular',
        '/movie/top_rated',
        '/movie/upcoming',
        '/movie/now_playing',
        '/trending/movie/week'
    ]);

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

export default Movie;
