import {
    Box,
    Button,
    Grid,
    GridItem,
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
import { useCallback, useEffect, useState } from 'react';
import tmdbFetch from 'utils/tmdbFetch';

interface SearchProps {
    query: string;
    config: TMDBConfig;
}

const useCategory = (type: string, query: string) => {
    const { data, isLoading, isError, page, setPage } = useSearch(
        type,
        query,
        true
    );

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
        page,
        setPage,
        data,
        loading: isLoading,
        error: isError
    };
};

const useCategories = (query: string) => {
    const movieCategory = useCategory('movie', query);
    const tvCategory = useCategory('tv', query);
    const personCategory = useCategory('person', query);
    const keywordCategory = useCategory('keyword', query);
    const companyCategory = useCategory('company', query);

    const categories = [
        movieCategory,
        tvCategory,
        personCategory,
        keywordCategory,
        companyCategory
    ];

    return categories;
};

const Search = ({ query, config }: SearchProps) => {
    const isMobile = useBreakpointValue({ base: true, lg: false });
    const [selected, setSelected] = useState(0);
    const categories = useCategories(query);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [categories[selected].page]);

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
                          vote_average,
                          known_for_department,
                          known_for
                      }) => {
                          const { mediaType } = categories[selected];

                          if (mediaType === 'movie' || mediaType === 'tv')
                              return (
                                  <GridItem
                                      key={id}
                                      w="100%"
                                      height={{
                                          base: '150px',
                                          lg: '190px'
                                      }}
                                      borderRadius="8px"
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
                                          rating={vote_average}
                                      />
                                  </GridItem>
                              );
                          else if (
                              mediaType === 'keyword' ||
                              mediaType === 'company'
                          )
                              return (
                                  <GridItem key={id} w="100%">
                                      <Button
                                          w="100%"
                                          as="a"
                                          href={`/${mediaType}/${id}`}
                                          colorScheme="teal"
                                          size="lg"
                                      >
                                          {name}
                                      </Button>
                                  </GridItem>
                              );
                          return (
                              <GridItem
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
                              </GridItem>
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
                        setSelected={(index: number) => setSelected(index)}
                    />
                ) : (
                    <MobileCategoryMenu
                        query={query}
                        categories={categories}
                        selected={selected}
                        setSelected={(index: number) => setSelected(index)}
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
                        gap={5}
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
                                pageChangeHandler={categories[index].setPage}
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
