import { Box, Button, HStack, Skeleton } from '@chakra-ui/react';
import CardGrid from 'components/CardGrid';
import Pagination from 'components/Pagination';
import { useEffect, useState } from 'react';

export interface TrendingCategory {
    trending: Trending;
    isLoading: boolean;
    setPage: (newPage: number) => void;
    page?: number;
}
interface TrendingLayoutProps {
    categories: TrendingCategory[];
    config: TMDBConfig;
    mediaType: 'movie' | 'tv';
}

const TrendingLayout = ({
    categories,
    mediaType,
    config
}: TrendingLayoutProps) => {
    const [selected, setSelected] = useState(0);
    const isLoading = categories[selected]?.isLoading;
    const page = categories[selected]?.page;

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [page]);

    return (
        <Box width="100%" maxWidth="1400px" m="auto" p="1rem">
            <HStack spacing="1rem" justify="center" mb="1.5rem">
                <Button colorScheme="teal" onClick={() => setSelected(0)}>
                    Daily
                </Button>
                <Button colorScheme="teal" onClick={() => setSelected(1)}>
                    Weekly
                </Button>
            </HStack>
            <CardGrid
                config={config}
                items={categories[selected]?.trending?.results}
                isLoading={isLoading}
            />
            <Skeleton
                isLoaded={!isLoading}
                startColor="white"
                endColor="white"
                minHeight="50px"
                minWidth="100%"
            >
                {!isLoading && (
                    <>
                        <Box
                            display={
                                categories[0]?.trending?.results?.length > 0 &&
                                selected === 0
                                    ? 'block'
                                    : 'none'
                            }
                        >
                            <Pagination
                                quantity={categories[0]?.trending?.total_pages}
                                pageChangeHandler={categories[0]?.setPage}
                                page={categories[0]?.trending?.page}
                            />
                        </Box>
                        <Box
                            display={
                                categories[1]?.trending?.results?.length > 0 &&
                                selected === 1
                                    ? 'block'
                                    : 'none'
                            }
                        >
                            <Pagination
                                quantity={categories[1]?.trending?.total_pages}
                                pageChangeHandler={categories[1]?.setPage}
                                page={categories[1]?.trending?.page}
                            />
                        </Box>
                    </>
                )}
            </Skeleton>
        </Box>
    );
};

export default TrendingLayout;
