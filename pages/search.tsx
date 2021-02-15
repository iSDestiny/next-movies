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
    Flex,
    useBreakpointValue,
    Button
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import useSearch from 'hooks/useSearch';
import { GetServerSideProps } from 'next';
import ShowCard from 'components/ShowCard';
import tmdbFetch from 'utils/tmdbFetch';
import CardSkeleton from 'components/CardSkeleton';
import CategoryMenu, { MobileCategoryMenu } from 'components/CategoryMenu';
import PersonCard from 'components/PersonCard';
import Pagination from 'components/Pagination';

interface SearchProps {
    query: string;
    config: TMDBConfig;
}

const Search = ({ query, config }: SearchProps) => {
    const { colorMode } = useColorMode();
    const [pages, setPages] = useState([1, 1, 1, 1]);
    const isMobile = useBreakpointValue({ base: true, lg: false });
    const [selected, setSelected] = useState(0);
    const { data: movieData, isLoading: movieLoading } = useSearch(
        'movie',
        query,
        query.trim().length > 0,
        pages[0]
    );
    const { data: tvShowData, isLoading: showLoading } = useSearch(
        'tv',
        query,
        query.trim().length > 0,
        pages[1]
    );
    const { data: personData, isLoading: personLoading } = useSearch(
        'person',
        query,
        query.trim().length > 0,
        pages[2]
    );
    const { data: keywordData, isLoading: keywordLoading } = useSearch(
        'keyword',
        query,
        query.trim().length > 0,
        pages[3]
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
        },
        {
            heading: 'Keywords',
            mediaType: 'keyword',
            data: keywordData,
            loading: true
        }
    ]);

    const pageChangeHandler = (currentPage: number) => {
        setPages((prev) => {
            const newPages = [...prev];
            newPages[selected] = currentPage;
            console.log('selected ' + selected);
            return newPages;
        });
    };

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

    useEffect(() => {
        setCategories((prev) => {
            const newCategories = [...prev];
            newCategories[3].data = keywordData;
            newCategories[3].loading = keywordLoading;
            console.log(keywordData);
            return newCategories;
        });
    }, [keywordData, keywordLoading]);

    useEffect(() => {
        console.log(pages);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [pages]);

    const hoverColor = colorMode === 'light' ? 'gray.100' : 'gray.700';

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
                          profile_path,
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
                                      _hover={{ bgColor: hoverColor }}
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
                          else if (mediaType === 'keyword')
                              return (
                                  <Button
                                      as="a"
                                      href={`/keyword/${id}`}
                                      colorScheme="teal"
                                      key={id}
                                      size="lg"
                                  >
                                      {name}
                                  </Button>
                              );
                          return (
                              <Box
                                  key={id}
                                  w="100%"
                                  height={{
                                      base: '150px',
                                      lg: '190px'
                                  }}
                              >
                                  <PersonCard
                                      href={`/person/${id}`}
                                      config={config}
                                      name={name}
                                      profilePath={profile_path}
                                      knownFor={known_for}
                                      department={known_for_department}
                                  />
                              </Box>
                          );
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
                justify="flex-start"
                m="auto"
                width="100%"
                maxWidth="1400px"
                spacing={{ base: '1.5rem', lg: '1rem', xl: '1.5rem' }}
                p={{ lg: '1.5rem 1rem' }}
            >
                {!isMobile ? (
                    <CategoryMenu
                        query={query}
                        categories={categories}
                        selected={selected}
                        setSelected={setSelected}
                    />
                ) : (
                    <MobileCategoryMenu
                        query={query}
                        categories={categories}
                        selected={selected}
                        setSelected={setSelected}
                    />
                )}
                <Box
                    px={{ base: '1rem', lg: 0 }}
                    pb={{ base: '1.5rem', lg: 0 }}
                    width={{ base: '100%', lg: '80%' }}
                >
                    <Grid
                        templateColumns={{ base: '1fr', xl: '1fr 1fr' }}
                        width="100%"
                        gap={3}
                        mb="1.5rem"
                    >
                        {query ? validQueryResult : invalidQueryResult}
                        {query &&
                            !categories[selected].loading &&
                            categories[selected]?.data?.results.length === 0 &&
                            invalidQueryResult}
                    </Grid>
                    {categories.map(({ data }, index) => (
                        <Box
                            key={index}
                            display={
                                data?.results.length > 0 && selected === index
                                    ? 'block'
                                    : 'none'
                            }
                        >
                            <Pagination
                                quantity={data?.total_pages}
                                pageChangeHandler={pageChangeHandler}
                            />
                        </Box>
                    ))}
                </Box>
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
