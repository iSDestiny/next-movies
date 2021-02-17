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
    Skeleton,
    Text,
    useColorMode,
    useToken,
    Link,
    VStack,
    Icon
} from '@chakra-ui/react';
import CardSkeleton from 'components/CardSkeleton';
import Pagination from 'components/Pagination';
import ShowCard from 'components/ShowCard';
import { Filters } from 'hooks/useDiscover';
import { useEffect, useState } from 'react';
import {
    FaBuilding,
    FaCaretDown,
    FaGlobeAmericas,
    FaLink
} from 'react-icons/fa';
import { HiLocationMarker } from 'react-icons/hi';

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
    type?: string;
    config?: TMDBConfig;
    company?: ProductionCompanyDetails;
}

interface LayoutHeaderProps extends LayoutProps {
    selected: number;
    setSelected: (index: number) => void;
}

interface MetaDataBarProps {
    company?: ProductionCompanyDetails;
}

const MetaDataBar = ({ company }: MetaDataBarProps) => {
    const { colorMode } = useColorMode();

    if (company) {
        const { name, headquarters, homepage, origin_country } = company;
        return (
            <Box width="100%" color="gray.100" bgColor="teal.600">
                <HStack
                    align="center"
                    spacing="1rem"
                    m="auto"
                    maxWidth="1400px"
                    p="0.5rem 1rem"
                >
                    <HStack>
                        <Icon as={FaBuilding} fontSize="1.1rem" />
                        <Text size="md">{name}</Text>
                    </HStack>
                    <HStack>
                        <Icon as={HiLocationMarker} fontSize="1.1rem" />
                        <Text size="md">{headquarters}</Text>
                    </HStack>
                    <HStack>
                        <Icon as={FaGlobeAmericas} />
                        <Text size="md">{origin_country}</Text>
                    </HStack>
                    <Link
                        href={homepage}
                        _hover={{ textDecoration: 'underline' }}
                        rel="noopener noreferrer"
                        target="_blank"
                    >
                        <HStack>
                            <Icon as={FaLink} />
                            <Text size="md">Homepage</Text>
                        </HStack>
                    </Link>
                </HStack>
            </Box>
        );
    }
    return null;
};

const LayoutHeader = ({
    heading,
    categories,
    selected,
    setSelected,
    config,
    company
}: LayoutHeaderProps) => {
    const { colorMode } = useColorMode();
    const [gray300, gray700] = useToken('colors', ['gray.300', 'gray.700']);
    const sideBarColor = colorMode === 'light' ? 'gray.100' : 'gray.700';
    const borderColor = colorMode === 'light' ? gray300 : gray700;
    const amounts = [
        categories[0]?.data?.total_results,
        categories[1]?.data?.total_results
    ];

    const { secure_base_url, logo_sizes } = config.images;

    return (
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
                    {company?.logo_path ? (
                        <img
                            src={`${secure_base_url}${logo_sizes[1]}${company.logo_path}`}
                            alt={`${company.name} logo`}
                        />
                    ) : (
                        <Heading as="h1" size="lg" textTransform="capitalize">
                            {heading}
                        </Heading>
                    )}
                    <Skeleton
                        isLoaded={!categories[selected].isLoading}
                        startColor="white"
                        endColor="white"
                    >
                        <Heading size="md">
                            {`${amounts[selected]?.toLocaleString()} ${
                                selected === 0 ? 'Movies' : 'TV Shows'
                            }`}
                        </Heading>
                    </Skeleton>
                </HStack>
            </Box>
            <MetaDataBar company={company} />
            <HStack
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

const SpecficFilterLayout = ({
    categories,
    heading,
    config,
    company
}: LayoutProps) => {
    const [selected, setSelected] = useState(0);
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [categories[selected].page]);

    return (
        <Box as="main" width="100%">
            <LayoutHeader
                config={config}
                categories={categories}
                heading={heading}
                company={company}
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
                              ({
                                  id,
                                  title,
                                  name,
                                  release_date,
                                  first_air_date,
                                  poster_path,
                                  overview,
                                  vote_average
                              }) => (
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
                                          rating={vote_average}
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
