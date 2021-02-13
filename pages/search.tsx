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
    useColorMode
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import useSearch from 'hooks/useSearch';
import { GetServerSideProps } from 'next';

const Search = ({ query }: { query: string }) => {
    const { colorMode } = useColorMode();
    const [pages, setPages] = useState({ movie: 1, tv: 1, person: 1 });
    const [selected, setSelected] = useState('movie');
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
        { heading: 'Movies', mediaType: 'movie', data: movieData },
        { heading: 'TV Shows', mediaType: 'tv', data: tvShowData },
        { heading: 'People', mediaType: 'person', data: personData }
    ]);

    const { movie: moviePage, tv: tvPage, person: personPage } = pages;

    useEffect(() => {
        setCategories((prev) => {
            const newCategories = [...prev];
            newCategories[0].data = movieData;
            return newCategories;
        });
    }, [movieData]);

    useEffect(() => {
        setCategories((prev) => {
            const newCategories = [...prev];
            newCategories[1].data = tvShowData;
            return newCategories;
        });
    }, [tvShowData]);

    useEffect(() => {
        setCategories((prev) => {
            const newCategories = [...prev];
            newCategories[2].data = personData;
            return newCategories;
        });
    }, [personData]);

    const sideBarColor = colorMode === 'light' ? 'gray.100' : 'gray.700';

    return (
        <GeneralLayout title={query as string}>
            <HStack
                align="center"
                m="auto"
                width="100%"
                maxWidth="1400px"
                p="1.5rem"
            >
                <VStack
                    borderRadius="5px"
                    width="250px"
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
                        isTruncated
                        p="1.2rem"
                    >{`Search: ${query}`}</Heading>
                    <VStack
                        as="ul"
                        listStyleType="none"
                        width="100%"
                        my="1rem"
                        spacing={0}
                    >
                        {categories.map(
                            ({ heading, mediaType, data }, index) => (
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
                                            selected === mediaType
                                                ? sideBarColor
                                                : 'inherit'
                                        }
                                        cursor="pointer"
                                        justify="space-between"
                                        align="center"
                                        p="0.5rem 1.5rem"
                                        onClick={() => setSelected(mediaType)}
                                    >
                                        <Text
                                            fontWeight={
                                                selected === mediaType
                                                    ? 'bold'
                                                    : 'normal'
                                            }
                                        >
                                            {heading}
                                        </Text>
                                        <Tag colorScheme="teal">
                                            {data?.total_results}
                                        </Tag>
                                    </HStack>
                                </Box>
                            )
                        )}
                    </VStack>
                </VStack>
            </HStack>
        </GeneralLayout>
    );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    return {
        props: {
            query: ctx.query.query as string
        }
    };
};

export default Search;
