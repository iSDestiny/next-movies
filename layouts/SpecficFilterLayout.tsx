import {
    Box,
    Button,
    forwardRef,
    Grid,
    Heading,
    HStack,
    Menu,
    MenuButton,
    MenuItem,
    MenuItemOption,
    MenuList,
    MenuOptionGroup,
    Portal,
    Text,
    useColorMode,
    useToken,
    VStack
} from '@chakra-ui/react';
import CardSkeleton from 'components/CardSkeleton';
import Pagination from 'components/Pagination';
import ShowCard from 'components/ShowCard';
import { Filters } from 'hooks/useDiscover';
import { useEffect, useState } from 'react';
import { FaCaretDown } from 'react-icons/fa';
import { MdSort } from 'react-icons/md';

interface Category {
    data: PopularMoviesAndPopularTVShows;
    page: number;
    sort: string;
    filters: Filters;
    setSort: (newSort: string) => void;
    setFilters: (newFilters: Filters) => void;
    setPage: (newPage: number) => void;
    isLoading: boolean;
    isError: any;
}

interface LayoutProps {
    categories: Category[];
    heading: string;
    config?: TMDBConfig;
}

interface LayoutHeaderProps extends LayoutProps {
    selected: number;
    setSelected: (index: number) => void;
}

const LayoutHeader = ({
    heading,
    categories,
    selected,
    setSelected
}: LayoutHeaderProps) => {
    const { colorMode } = useColorMode();
    const [gray300, gray700] = useToken('colors', ['gray.300', 'gray.700']);
    const sideBarColor = colorMode === 'light' ? 'gray.100' : 'gray.700';
    const borderColor = colorMode === 'light' ? gray300 : gray700;

    return (
        <VStack
            width="100%"
            as="header"
            borderBottom={`1px solid ${borderColor}`}
        >
            <Box width="100%" color="white" bgColor="teal.500">
                <HStack
                    width="100%"
                    justify="space-between"
                    p="1rem"
                    maxWidth="1400px"
                    m="auto"
                >
                    <Heading as="h1" size="lg" textTransform="capitalize">
                        {heading}
                    </Heading>
                    <Heading size="md">
                        {`${categories[
                            selected
                        ]?.data?.total_results.toLocaleString()} ${
                            selected === 0 ? 'Movies' : 'TV Shows'
                        }`}
                    </Heading>
                </HStack>
            </Box>
            <HStack
                mt="0px !important"
                width="100%"
                justify="center"
                p={{ base: '0.3rem', sm: '0.5rem' }}
            >
                <Menu>
                    <MenuButton
                        as={Button}
                        variant="ghost"
                        rightIcon={<FaCaretDown />}
                    >
                        {selected === 0 ? 'Movies' : 'TV Shows'}
                    </MenuButton>
                    <Portal>
                        <MenuList>
                            <MenuItem onClick={() => setSelected(0)}>
                                Movies
                            </MenuItem>
                            <MenuItem onClick={() => setSelected(1)}>
                                TV Shows
                            </MenuItem>
                        </MenuList>
                    </Portal>
                </Menu>
                <Menu>
                    <MenuButton
                        as={Button}
                        variant="ghost"
                        rightIcon={<FaCaretDown />}
                    >
                        Sort
                    </MenuButton>
                    <Portal>
                        <MenuList>
                            <MenuOptionGroup
                                title="Popularity"
                                type="radio"
                                onChange={(value) =>
                                    categories[selected].setSort(
                                        value as string
                                    )
                                }
                                value={categories[selected].sort}
                            >
                                <MenuItemOption value="popularity.asc">
                                    Ascending
                                </MenuItemOption>
                                <MenuItemOption value="popularity.desc">
                                    Descending
                                </MenuItemOption>
                            </MenuOptionGroup>
                            <MenuOptionGroup
                                title="Rating"
                                type="radio"
                                onChange={(value) =>
                                    categories[selected].setSort(
                                        value as string
                                    )
                                }
                                value={categories[selected].sort}
                            >
                                <MenuItemOption value="vote_average.asc">
                                    Ascending
                                </MenuItemOption>
                                <MenuItemOption value="vote_average.desc">
                                    Descending
                                </MenuItemOption>
                            </MenuOptionGroup>
                            <MenuOptionGroup
                                title="Release Date"
                                type="radio"
                                onChange={(value) =>
                                    categories[selected].setSort(
                                        value as string
                                    )
                                }
                                value={categories[selected].sort}
                            >
                                <MenuItemOption value="primary_release_date.asc">
                                    Ascending
                                </MenuItemOption>
                                <MenuItemOption value="primary_release_date.desc">
                                    Descending
                                </MenuItemOption>
                            </MenuOptionGroup>
                        </MenuList>
                    </Portal>
                </Menu>
            </HStack>
        </VStack>
    );
};

const SpecficFilterLayout = ({ categories, heading, config }: LayoutProps) => {
    const [selected, setSelected] = useState(0);
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [categories[selected].page]);

    return (
        <Box as="main" width="100%">
            <LayoutHeader
                categories={categories}
                heading={heading}
                selected={selected}
                setSelected={setSelected}
            />
            <Box width="100%" maxWidth="1400px" m="auto" p="1rem">
                <Grid
                    templateColumns={{ base: '1fr', xl: '1fr 1fr' }}
                    width="100%"
                    gap={3}
                    mb="1.5rem"
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
                                              selected === 0
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
                <Box
                    display={
                        categories[0]?.data?.results?.length > 0 &&
                        selected === 0
                            ? 'block'
                            : 'none'
                    }
                >
                    <Pagination
                        quantity={categories[0]?.data?.total_pages}
                        pageChangeHandler={categories[0].setPage}
                    />
                </Box>
                <Box
                    display={
                        categories[1]?.data?.results?.length > 0 &&
                        selected === 1
                            ? 'block'
                            : 'none'
                    }
                >
                    <Pagination
                        quantity={categories[1]?.data?.total_pages}
                        pageChangeHandler={categories[1].setPage}
                    />
                </Box>
            </Box>
        </Box>
    );
};

export default SpecficFilterLayout;
