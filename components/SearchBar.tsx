import {
    Box,
    DarkMode,
    Flex,
    HStack,
    Icon,
    Input,
    InputGroup,
    InputLeftElement,
    useColorMode,
    Text,
    VStack,
    Skeleton
} from '@chakra-ui/react';
import useSearch from 'hooks/useSearch';
import { Component, useEffect, useState } from 'react';
import { FaFilm, FaSearch, FaTv, FaUser } from 'react-icons/fa';
import MotionBox from './MotionBox';

interface SearchBarProps {
    isOpen: boolean;
}

const SearchBar = ({ isOpen }: SearchBarProps) => {
    const [query, setQuery] = useState('');
    const { data, isLoading } = useSearch(query, query.trim().length > 0);

    useEffect(() => {
        console.log(data);
    }, [data]);

    const searchVariants = {
        open: {
            x: 0,
            transition: {
                type: 'spring',
                stiffness: 250,
                damping: 40
            }
        },
        closed: {
            x: '-100%',
            transition: {
                type: 'spring',
                stiffness: 250,
                damping: 40
            }
        }
    };

    return (
        <MotionBox
            width="100%"
            bgColor="white"
            variants={searchVariants}
            animate={isOpen ? 'open' : 'closed'}
            initial="closed"
            position="absolute"
        >
            <Box width="100%" border="1px solid #BDC6C7">
                <Flex
                    align="center"
                    height="40px"
                    maxWidth="1400px"
                    m="auto"
                    width="100%"
                    color="black"
                >
                    <InputGroup>
                        <InputLeftElement
                            pointerEvents="none"
                            children={<FaSearch />}
                        />
                        <Input
                            onChange={(e) => setQuery(e.target.value)}
                            value={query}
                            maxWidth="1400px"
                            focusBorderColor="rgba(0,0,0,0)"
                            border="none"
                            variant="flushed"
                            _placeholder={{ color: 'gray.400' }}
                            placeholder="search for a movie, tv show, or person"
                        />
                    </InputGroup>
                </Flex>
            </Box>
            <VStack
                align="center"
                width="100%"
                spacing="0px"
                borderX="1px solid #BDC6C7"
                color="black"
            >
                {data && data.results.length > 0 ? (
                    data.results
                        .slice(0, 10)
                        .map(({ media_type, name, title, id }) => {
                            let film: any;
                            if (media_type === 'movie') film = FaFilm;
                            else if (media_type === 'tv') film = FaTv;
                            else if (media_type === 'person') film = FaUser;

                            return (
                                <Box
                                    width="100%"
                                    borderBottom="1px solid #BDC6C7"
                                >
                                    <HStack
                                        width="100%"
                                        spacing="0.5rem"
                                        align="center"
                                        justify="flex-start"
                                        maxWidth="1400px"
                                        m="auto"
                                        px="0.7rem"
                                        key={id}
                                    >
                                        <Icon as={film} />
                                        <Text size="sm" noOfLines={1}>
                                            {name || title}
                                        </Text>
                                    </HStack>
                                </Box>
                            );
                        })
                ) : (
                    <VStack
                        spacing="0.3rem"
                        width="100%"
                        display={query.trim().length > 0 ? 'flex' : 'none'}
                        align="center"
                        justify="center"
                        maxWidth="1400px"
                        p="0.5rem 1rem"
                        m="auto"
                    >
                        {!isLoading ? (
                            <Text size="lg" p="1rem" fontWeight="bold">
                                No results
                            </Text>
                        ) : (
                            [...Array(10).keys()].map((num) => (
                                <Skeleton
                                    height="16px"
                                    width="100%"
                                    key={num}
                                    startColor="gray.200"
                                    endColor="gray.400"
                                />
                            ))
                        )}
                    </VStack>
                )}
            </VStack>
        </MotionBox>
    );
};

export default SearchBar;
