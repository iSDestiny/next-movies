import {
    Box,
    Button,
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
    Icon,
    Stack,
    useBreakpointValue,
    GridItem
} from '@chakra-ui/react';
import CardGrid from 'components/CardGrid';
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
    categories?: Category[];
    heading?: string;
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
    if (company) {
        const { name, headquarters, homepage, origin_country } = company;
        return (
            <Box width="100%" color="gray.100" bgColor="teal.600">
                <Stack
                    direction={{ base: 'column', md: 'row' }}
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

                    <HStack spacing="1rem">
                        {headquarters && (
                            <HStack>
                                <Icon as={HiLocationMarker} fontSize="1.1rem" />
                                <Text size="md">{headquarters}</Text>
                            </HStack>
                        )}
                        {origin_country && (
                            <HStack>
                                <Icon as={FaGlobeAmericas} />
                                <Text size="md">{origin_country}</Text>
                            </HStack>
                        )}
                    </HStack>
                    {homepage && (
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
                    )}
                </Stack>
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
    company,
    type
}: LayoutHeaderProps) => {
    const { colorMode } = useColorMode();
    const [gray300, gray700] = useToken('colors', ['gray.300', 'gray.700']);
    const borderColor = colorMode === 'light' ? gray300 : gray700;
    const amountSize = useBreakpointValue({ base: 'sm', md: 'md' });
    const headingSize = useBreakpointValue({ base: 'md', md: 'lg' });
    const { secure_base_url, logo_sizes } = config?.images;
    const logoSize = useBreakpointValue({
        base: logo_sizes[0],
        md: logo_sizes[1]
    });
    const amounts = [
        categories[0]?.data?.total_results,
        categories[1]?.data?.total_results
    ];

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
                            src={`${secure_base_url}${logoSize}${company.logo_path}`}
                            alt={`${company.name} logo`}
                        />
                    ) : (
                        <Heading
                            as="h1"
                            size={headingSize}
                            textTransform="capitalize"
                        >
                            {heading}
                        </Heading>
                    )}
                    <Skeleton
                        isLoaded={!categories[selected].isLoading}
                        startColor="white"
                        endColor="white"
                    >
                        <Heading size={amountSize}>
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
                {type !== 'network' && (
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
                )}
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
                                    categories[selected]?.setSort(
                                        value as string
                                    )
                                }
                                value={categories[selected]?.sort}
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
                                    categories[selected]?.setSort(
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
                                    categories[selected]?.setSort(
                                        value as string
                                    )
                                }
                                value={categories[selected]?.sort}
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
    company,
    type
}: LayoutProps) => {
    const [selected, setSelected] = useState(type === 'network' ? 1 : 0);
    const isLoading = categories[selected]?.isLoading;
    const page = categories[selected].page;

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [page]);

    return (
        <Box as="main" width="100%">
            <LayoutHeader
                config={config}
                categories={categories}
                heading={heading}
                company={company}
                selected={selected}
                setSelected={setSelected}
                type={type}
            />
            <Box width="100%" maxWidth="1400px" m="auto" p="1rem">
                <CardGrid
                    config={config}
                    items={categories[selected]?.data?.results}
                    isLoading={isLoading}
                />
                <Skeleton
                    isLoaded={!isLoading}
                    startColor="white"
                    endColor="white"
                    minHeight="50px"
                    minWidth="100%"
                >
                    {categories && (
                        <>
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
                                    pageChangeHandler={categories[0]?.setPage}
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
                                    pageChangeHandler={categories[1]?.setPage}
                                />
                            </Box>
                        </>
                    )}
                </Skeleton>
            </Box>
        </Box>
    );
};

export default SpecficFilterLayout;
