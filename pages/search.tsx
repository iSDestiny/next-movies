import {
    Box,
    Button,
    Grid,
    Stack,
    Text,
    useBreakpointValue,
    useColorMode
} from '@chakra-ui/react';
import CardSkeleton from 'components/CardSkeleton';
import CategoryMenu, { MobileCategoryMenu } from 'components/CategoryMenu';
import Pagination from 'components/Pagination';
import PersonCard from 'components/PersonCard';
import ShowCard from 'components/ShowCard';
import useSearch from 'hooks/useSearch';
import GeneralLayout from 'layouts/GeneralLayout';
import { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';
import tmdbFetch from 'utils/tmdbFetch';

interface SearchProps {
    query: string;
    config: TMDBConfig;
}

const useCategory = (type: string, query: string, page: number) => {
    const { data, isLoading, isError } = useSearch(type, query, true, page);

    const headings = {
        movie: 'Movies',
        tv: 'TV Shows',
        person: 'People',
        keyword: 'Keywords',
        network: 'Networks',
        company: 'Companies'
    };

    return {
        heading: headings[type],
        mediaType: type,
        data,
        loading: isLoading,
        error: isError
    };
};

const useCategories = (query: string, pages: number[]) => {
    const movieCategory = useCategory('movie', query, pages[0]);
    const tvCategory = useCategory('tv', query, pages[1]);
    const personCategory = useCategory('person', query, pages[2]);
    const keywordCategory = useCategory('keyword', query, pages[3]);

    return [movieCategory, tvCategory, personCategory, keywordCategory];
};

const Search = ({ query, config }: SearchProps) => {
    const { colorMode } = useColorMode();
    const [pages, setPages] = useState([1, 1, 1, 1]);
    const isMobile = useBreakpointValue({ base: true, lg: false });
    const [selected, setSelected] = useState(0);
    const categories = useCategories(query, pages);

    const pageChangeHandler = (currentPage: number) => {
        setPages((prev) => {
            const newPages = [...prev];
            newPages[selected] = currentPage;
            console.log('selected ' + selected);
            return newPages;
        });
    };

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
        <GeneralLayout title={query} key={query}>
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
                        {categories[selected].data?.results?.length <= 0 &&
                            invalidQueryResult}
                    </Grid>
                    {categories.map(({ data, mediaType }, index) => (
                        <Box
                            key={`${query}-${index}`}
                            display={
                                data?.results.length > 0 && selected === index
                                    ? 'block'
                                    : 'none'
                            }
                        >
                            <Pagination
                                key={`${query}-${mediaType}-${index}`}
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
