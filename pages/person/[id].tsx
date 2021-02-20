import GeneralLayout from 'layouts/GeneralLayout';
import PersonSideData from 'components/PersonSideData';
import { GetStaticPaths, GetStaticProps } from 'next';
import { ungzip } from 'node-gzip';
import { useEffect } from 'react';
import addLeadingZeroToDate from 'utils/addLeadingZeroToDate';
import tmdbFetch from 'utils/tmdbFetch';
import tmdbFetchGzip from 'utils/tmdbFetchGzip';
import { Box, Heading, HStack, Text, VStack } from '@chakra-ui/react';
import ShowCarousel from 'components/ShowCarousel';
import Credits from 'components/Credits';

interface PersonProps {
    personData: PersonDetails;
    knownFor: KnownForEntity[];
    config: TMDBConfig;
}

const Person = ({ personData, config, knownFor }: PersonProps) => {
    const {
        name,
        also_known_as,
        combined_credits,
        birthday,
        deathday,
        gender,
        homepage,
        images,
        known_for_department,
        place_of_birth,
        profile_path,
        biography
    } = personData;
    useEffect(() => {
        console.log(personData);
        console.log(knownFor);
    }, []);

    const { secure_base_url, poster_sizes } = config.images;

    return (
        <GeneralLayout title={name}>
            <HStack
                as="main"
                p="2rem 1rem"
                maxWidth="1400px"
                spacing="2rem"
                m="auto"
                align="flex-start"
            >
                <PersonSideData config={config} personData={personData} />
                <VStack width="78%" as="main" align="flex-start" spacing="2rem">
                    <Heading as="h1" size="lg">
                        {name}
                    </Heading>
                    <Box>
                        <Heading size="md" mb="0.5rem">
                            Biography
                        </Heading>
                        <Text size="sm">{biography}</Text>
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
                            noOfSlides={6}
                            naturalHeight={2200}
                            starSize="1rem"
                            headingSize="1rem"
                            ratingSize="1rem"
                            buttonSize="2rem"
                        />
                    </Box>
                    <Credits credits={combined_credits} />
                </VStack>
            </HStack>
        </GeneralLayout>
    );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const { id } = params;
    let personData: PersonDetails;
    let config: TMDBConfig;
    let knownFor: KnownForEntity[];

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
