import {
    Box,
    Button,
    Heading,
    HStack,
    Skeleton,
    useBreakpointValue,
    useColorMode,
    useToken,
    VStack
} from '@chakra-ui/react';
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
    const { colorMode } = useColorMode();
    const [selected, setSelected] = useState(0);
    const isLoading = categories[selected]?.isLoading;
    const page = categories[selected]?.page;
    const [gray300, gray700] = useToken('colors', ['gray.300', 'gray.700']);
    const borderColor = colorMode === 'light' ? gray300 : gray700;
    const amountSize = useBreakpointValue({ base: 'sm', md: 'md' });
    const headingSize = useBreakpointValue({ base: 'md', md: 'lg' });
    const amounts = [
        categories[0]?.trending?.total_results,
        categories[1]?.trending?.total_results
    ];

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [page]);

    return (
        <Box width="100%" as="main">
            <VStack
                width="100%"
                as="header"
                borderBottom={`1px solid ${borderColor}`}
                spacing="0px"
            >
                <Box width="100%" color="white" bgColor="teal.500">
                    <HStack
                        width="100%"
                        justify="space-between"
                        p="1rem"
                        maxWidth="1400px"
                        m="auto"
                    >
                        <Heading as="h1" size={headingSize}>
                            {`Trending ${
                                mediaType === 'movie' ? 'Movies' : 'TV Shows'
                            }`}
                        </Heading>
                        <Skeleton
                            isLoaded={!categories[selected].isLoading}
                            startColor="white"
                            endColor="white"
                        >
                            <Heading size={amountSize}>
                                {`${amounts[selected]?.toLocaleString()} ${
                                    mediaType === 'movie'
                                        ? 'Movies'
                                        : 'TV Shows'
                                }`}
                            </Heading>
                        </Skeleton>
                    </HStack>
                </Box>
                <HStack
                    spacing="1rem"
                    justify="center"
                    p="0.5rem"
                    align="center"
                >
                    <Button
                        colorScheme="teal"
                        onClick={() => setSelected(0)}
                        variant={selected === 0 ? 'solid' : 'outline'}
                    >
                        Daily
                    </Button>
                    <Button
                        colorScheme="teal"
                        onClick={() => setSelected(1)}
                        variant={selected === 1 ? 'solid' : 'outline'}
                    >
                        Weekly
                    </Button>
                </HStack>
            </VStack>
            <Box width="100%" maxWidth="1400px" m="auto" p="1rem" as="main">
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
                                    categories[0]?.trending?.results?.length >
                                        0 && selected === 0
                                        ? 'block'
                                        : 'none'
                                }
                            >
                                <Pagination
                                    quantity={
                                        categories[0]?.trending?.total_pages
                                    }
                                    pageChangeHandler={categories[0]?.setPage}
                                    page={categories[0]?.trending?.page}
                                />
                            </Box>
                            <Box
                                display={
                                    categories[1]?.trending?.results?.length >
                                        0 && selected === 1
                                        ? 'block'
                                        : 'none'
                                }
                            >
                                <Pagination
                                    quantity={
                                        categories[1]?.trending?.total_pages
                                    }
                                    pageChangeHandler={categories[1]?.setPage}
                                    page={categories[1]?.trending?.page}
                                />
                            </Box>
                        </>
                    )}
                </Skeleton>
            </Box>
        </Box>
    );
};

export default TrendingLayout;
