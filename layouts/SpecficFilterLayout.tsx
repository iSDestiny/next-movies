import { Box, Grid, Heading, HStack, Text, VStack } from '@chakra-ui/react';
import CardSkeleton from 'components/CardSkeleton';
import ShowCard from 'components/ShowCard';
import { Filters } from 'hooks/useDiscover';
import { useState } from 'react';

interface Category {
    data: PopularMoviesAndPopularTVShows;
    page: number;
    setSort: (newSort: string) => void;
    setFilters: (newFilters: Filters) => void;
    setPage: (newPage: number) => void;
    isLoading: boolean;
    isError: any;
}

interface LayoutProps {
    categories: Category[];
    keyword: string;
    config?: TMDBConfig;
}

interface LayoutHeaderProps extends LayoutProps {
    selected: number;
    setSelected: (index: number) => void;
}

const LayoutHeader = ({
    keyword,
    categories,
    selected,
    setSelected
}: LayoutHeaderProps) => {
    return (
        <VStack width="100%" as="header">
            <Box width="100%" color="white" bgColor="teal.500">
                <HStack
                    width="100%"
                    justify="space-between"
                    p="1rem"
                    maxWidth="1400px"
                    m="auto"
                >
                    <Heading as="h1" size="lg">
                        {keyword}
                    </Heading>
                    <Heading size="md">
                        {`${categories[selected]?.data?.total_results} ${
                            selected === 0 ? 'Movies' : 'TV Shows'
                        }`}
                    </Heading>
                </HStack>
            </Box>
        </VStack>
    );
};

const SpecficFilterLayout = ({ categories, keyword, config }: LayoutProps) => {
    const [selected, setSelected] = useState(0);
    return (
        <Box as="main" width="100%">
            <LayoutHeader
                categories={categories}
                keyword={keyword}
                selected={selected}
                setSelected={setSelected}
            />
            <Box width="100%" maxWidth="1400px" m="auto">
                <Grid
                    templateColumns={{ base: '1fr', xl: '1fr 1fr' }}
                    width="100%"
                    gap={3}
                    mb="1.5rem"
                    p="1rem"
                >
                    {!categories[selected]?.isLoading
                        ? categories[selected]?.data?.results?.map(
                              (
                                  {
                                      id,
                                      title,
                                      name,
                                      release_date,
                                      first_air_date,
                                      poster_path,
                                      overview
                                  },
                                  index
                              ) => (
                                  <Box key={id} width="100%">
                                      <ShowCard
                                          href={
                                              index === 0
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
                              )
                          )
                        : [...Array(20).keys()].map((num) => (
                              <CardSkeleton key={num} />
                          ))}
                </Grid>
            </Box>
        </Box>
    );
};

export default SpecficFilterLayout;
