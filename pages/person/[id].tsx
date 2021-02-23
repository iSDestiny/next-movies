import {
    Box,
    Heading,
    Stack,
    Text,
    useBreakpointValue,
    VStack
} from '@chakra-ui/react';
import Credits from 'components/Credits';
import PersonSideData from 'components/PersonSideData';
import ShowCarousel from 'components/ShowCarousel';
import GeneralLayout from 'layouts/GeneralLayout';
import { GetStaticPaths, GetStaticProps } from 'next';
import { ungzip } from 'node-gzip';
import { useEffect } from 'react';
import addLeadingZeroToDate from 'utils/addLeadingZeroToDate';
import tmdbFetch from 'utils/tmdbFetch';
import tmdbFetchGzip from 'utils/tmdbFetchGzip';

interface PersonProps {
    personData: PersonDetails;
    knownFor: KnownForEntity[];
    config: TMDBConfig;
}

const Person = ({ personData, config, knownFor }: PersonProps) => {
    const { name, combined_credits, biography } = personData;
    const isMobile = useBreakpointValue({ base: true, lg: false });
    const noOfSlides = useBreakpointValue([3, 4, 5, 6, 7]);
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

    useEffect(() => {
        console.log(personData);
        console.log(knownFor);
    }, []);

    const { secure_base_url, poster_sizes } = config.images;

    return (
        <GeneralLayout title={name}>
            <Stack
                direction={{ base: 'column', lg: 'row' }}
                as="main"
                p="2rem 1rem"
                maxWidth="1400px"
                spacing="2rem"
                m="auto"
                align="flex-start"
            >
                <PersonSideData config={config} personData={personData} />
                <VStack
                    width={{ base: '100%', lg: '78%' }}
                    as="main"
                    align="flex-start"
                    spacing="2rem"
                >
                    {!isMobile && (
                        <Heading as="h1" size="lg">
                            {name}
                        </Heading>
                    )}
                    <Box>
                        <Heading size="md" mb="0.5rem">
                            Biography
                        </Heading>
                        <Text fontSize={{ base: 'sm', md: 'md' }}>
                            {biography}
                        </Text>
                    </Box>
                    <Box width="100%">
                        <Heading size="md" mb="0.5rem">
                            Known for
                        </Heading>
                        <ShowCarousel
                            name="known for"
                            items={knownFor}
                            base_url={secure_base_url}
                            poster_sizes={poster_sizes}
                            noOfSlides={noOfSlides}
                            naturalHeight={2300}
                            starSize={starSize}
                            headingSize={carouselHeadingSize}
                            ratingSize={ratingSize}
                            buttonSize={buttonSize}
                        />
                    </Box>
                    <Credits credits={combined_credits} />
                </VStack>
            </Stack>
        </GeneralLayout>
    );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const { id } = params;
    let personData: PersonDetails;
    let config: TMDBConfig;
    let knownFor: KnownForEntity[];

    try {
        const { data: configData } = await tmdbFetch.get('/configuration');

        const { data }: { data: PersonDetails } = await tmdbFetch.get(
            `/person/${id}`,
            {
                params: {
                    append_to_response: 'combined_credits,images'
                }
            }
        );

        const { combined_credits, known_for_department } = data;

        let knownForEntries = combined_credits[
            known_for_department === 'Acting' ? 'cast' : 'crew'
        ] as CombinedCrewEntityAndCastEntity[];
        knownForEntries.sort((first, second) => {
            if (first.vote_count < second.vote_count) return 1;
            if (first.vote_count > second.vote_count) return -1;
            return 0;
        });

        // Remove duplicates
        knownForEntries = knownForEntries.filter(
            ({ id }, index, self) =>
                index === self.findIndex(({ id: searchId }) => searchId === id)
        );

        knownFor = knownForEntries.slice(0, 10) as KnownForEntity[];

        config = configData;
        personData = data;

        return {
            props: {
                personData,
                knownFor,
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
        `/person_ids_${addLeadingZeroToDate(month)}_${addLeadingZeroToDate(
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
        fallback: true
    };
};

export default Person;
