import { useRouter } from 'next/router';
import GeneralLayout from 'layouts/GeneralLayout';
import {
    Box,
    Text,
    Heading,
    HStack,
    VStack,
    Tag,
    useToken,
    useColorMode,
    Grid,
    Stack,
    Skeleton,
    SkeletonText,
    Flex
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import useSearch from 'hooks/useSearch';
import { GetServerSideProps } from 'next';
import ShowCard from 'components/ShowCard';
import tmdbFetch from 'utils/tmdbFetch';
import CardSkeleton from 'components/CardSkeleton';

interface SearchProps {
    query: string;
    config: TMDBConfig;
}

const Search = ({ query, config }: SearchProps) => {
    const { colorMode } = useColorMode();
    const [pages, setPages] = useState({ movie: 1, tv: 1, person: 1 });
    const [selected, setSelected] = useState(0);
    const [gray300, gray700] = useToken('colors', ['gray.300', 'gray.700']);
    const { data: movieData, isLoading: movieLoading } = useSearch(
        'movie',
        query,
        query.trim().length > 0,
        pages.movie
    );
    const { data: tvShowData, isLoading: showLoading } = useSearch(
        'tv',
        query,
        query.trim().length > 0,
        pages.tv
    );
    const { data: personData, isLoading: personLoading } = useSearch(
        'person',
        query,
        query.trim().length > 0,
        pages.person
    );

    const [categories, setCategories] = useState([
        {
            heading: 'Movies',
            mediaType: 'movie',
            data: movieData,
            loading: true
        },
        {
            heading: 'TV Shows',
            mediaType: 'tv',
            data: tvShowData,
            loading: true
        },
        {
            heading: 'People',
            mediaType: 'person',
            data: personData,
            loading: true
        }
    ]);

    const { movie: moviePage, tv: tvPage, person: personPage } = pages;

    useEffect(() => {
        setCategories((prev) => {
            const newCategories = [...prev];
            newCategories[0].data = movieData;
            newCategories[0].loading = movieLoading;
            console.log(movieData);
            return newCategories;
        });
    }, [movieData, movieLoading]);

    useEffect(() => {
        setCategories((prev) => {
            const newCategories = [...prev];
            newCategories[1].data = tvShowData;
            newCategories[1].loading = showLoading;
            console.log(tvShowData);
            return newCategories;
        });
    }, [tvShowData, showLoading]);

    useEffect(() => {
        setCategories((prev) => {
            const newCategories = [...prev];
            newCategories[2].data = personData;
            newCategories[2].loading = personLoading;
            console.log(personData);
            return newCategories;
        });
    }, [personData, personLoading]);

    const sideBarColor = colorMode === 'light' ? 'gray.100' : 'gray.700';

    const validQueryResult = (
        <>
            {!categories[selected].loading
                ? categories[selected]?.data?.results.map(
                      ({
                          title,
                          name,
                          id,
                          first_air_date,
                          release_date,
                          poster_path,
                          overview,
                          known_for_department,
                          known_for
                      }) => {
                          const { mediaType } = categories[selected];

                          if (mediaType === 'movie' || mediaType === 'tv')
                              return (
                                  <Box
                                      key={id}
                                      w="100%"
                                      height={{
                                          base: '150px',
                                          lg: '190px'
                                      }}
                                      borderRadius="8px"
                                      _hover={{ bgColor: sideBarColor }}
                                  >
                                      <ShowCard
                                          href={
                                              mediaType === 'movie'
                                                  ? `/movies/${id}`
                                                  : `/tv/${id}`
                                          }
                                          config={config}
                                          title={title || name}
                                          date={release_date || first_air_date}
                                          posterPath={poster_path}
                                          overview={overview}
                                      />
                                  </Box>
                              );
                          return <Box key={id} w="100%" height="180px"></Box>;
                      }
                  )
                : [...Array(20).keys()].map((num) => (
                      <CardSkeleton key={num} />
                  ))}
        </>
    );

    const invalidQueryResult = (
        <Text>{`There are no ${categories[
            selected
        ].heading.toLowerCase()} that matched`}</Text>
    );

    return (
        <GeneralLayout title={query}>
            <Stack
                direction={{ base: 'column', lg: 'row' }}
                align="flex-start"
                m="auto"
                width="100%"
                maxWidth="1400px"
                p="1.5rem 1rem"
                spacing="2rem"
            >
                <VStack
                    display={{ base: 'none', lg: 'flex' }}
                    width="20%"
                    as="aside"
                    borderRadius="8px"
                    overflow="hidden"
                    border={`1px solid ${
                        colorMode === 'light' ? gray300 : gray700
                    }`}
                >
                    <Heading
                        width="100%"
                        as="h3"
                        size="md"
                        color="white"
                        bgColor="teal.500"
                        p="1.2rem"
                    >
                        {`"${query}"`}
                    </Heading>
                    <VStack
                        as="ul"
                        listStyleType="none"
                        width="100%"
                        my="1rem"
                        spacing={0}
                    >
                        {categories.map(({ heading, data }, index) => (
                            <Box as="li" width="100%" key={index} m="0px">
                                <HStack
                                    width="100%"
                                    as="button"
                                    _focus={{
                                        bgColor: sideBarColor,
                                        outline: 'none'
                                    }}
                                    _hover={{
                                        bgColor: sideBarColor
                                    }}
                                    bgColor={
                                        selected === index
                                            ? sideBarColor
                                            : 'inherit'
                                    }
                                    cursor="pointer"
                                    justify="space-between"
                                    align="center"
                                    p="0.5rem 1.5rem"
                                    onClick={() => setSelected(index)}
                                >
                                    <Text
                                        fontWeight={
                                            selected === index
                                                ? 'bold'
                                                : 'normal'
                                        }
                                    >
                                        {heading}
                                    </Text>
                                    <Tag colorScheme="teal">
                                        {query ? data?.total_results : 0}
                                    </Tag>
                                </HStack>
                            </Box>
                        ))}
                    </VStack>
                </VStack>
                <Grid
                    templateColumns={{ base: '1fr', xl: '1fr 1fr' }}
                    gap={3}
                    width={{ base: '100%', lg: '80%' }}
                >
                    {query ? validQueryResult : invalidQueryResult}
                </Grid>
            </Stack>
        </GeneralLayout>
    );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { data: configData } = await tmdbFetch.get('/configuration');

    return {
        props: {
            query: (ctx?.query?.query as string) || '',
            config: configData
        }
    };
};

export default Search;
