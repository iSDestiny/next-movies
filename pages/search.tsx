import { useRouter } from 'next/router';
import GeneralLayout from 'layouts/GeneralLayout';
import {
    Box,
    Text,
    Heading,
    HStack,
    VStack,
    Tag,
    useToken
} from '@chakra-ui/react';
import { useState } from 'react';

const Search = () => {
    const router = useRouter();
    const { query } = router.query;
    const [selected, setSelected] = useState('Movies');
    const [gray300] = useToken('colors', ['gray.300']);
    const categories = [
        { heading: 'Movies', mediaType: 'movie' },
        { heading: 'TV Shows', mediaType: 'tv' },
        { heading: 'People', mediaType: 'person' }
    ];

    return (
        <GeneralLayout title={query as string}>
            <HStack
                align="center"
                m="auto"
                width="100%"
                maxWidth="1400px"
                py="1.5rem"
            >
                <VStack
                    borderRadius="5px"
                    width="250px"
                    overflow="hidden"
                    border={`1px solid ${gray300}`}
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
                        {categories.map(({ heading, mediaType }, index) => (
                            <Box as="li" width="100%" key={index} m="0px">
                                <HStack
                                    width="100%"
                                    as="button"
                                    _focus={{
                                        bgColor: 'gray.100',
                                        outline: 'none'
                                    }}
                                    _hover={{ bgColor: 'gray.100' }}
                                    cursor="pointer"
                                    justify="space-between"
                                    align="center"
                                    p="0.5rem 1.5rem"
                                    onClick={() => setSelected(heading)}
                                >
                                    <Text
                                        fontWeight={
                                            selected === heading
                                                ? 'bold'
                                                : 'normal'
                                        }
                                    >
                                        {heading}
                                    </Text>
                                    <Tag colorScheme="teal">{100}</Tag>
                                </HStack>
                            </Box>
                        ))}
                    </VStack>
                </VStack>
            </HStack>
        </GeneralLayout>
    );
};

export default Search;
