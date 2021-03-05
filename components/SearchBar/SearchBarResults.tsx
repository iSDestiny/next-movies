import { Box, HStack, Icon, Skeleton, Text, VStack } from '@chakra-ui/react';
import { FaFilm, FaTv, FaUser } from 'react-icons/fa';

interface SearchBarResultsProps {
    data: SearchResults;
    currSelection: number;
    goToEntity: (mediaType: string, id: number) => void;
}

const SearchBarResults = ({
    data,
    currSelection,
    goToEntity
}: SearchBarResultsProps) => {
    return (
        <VStack
            as="ul"
            listStyleType="none"
            align="center"
            width="100%"
            spacing="0px"
            borderX="1px solid #BDC6C7"
            color="black"
        >
            {data.results
                .slice(0, 10)
                .map(({ media_type, name, title, id }, index) => {
                    let film: any;
                    if (media_type === 'movie') film = FaFilm;
                    else if (media_type === 'tv') film = FaTv;
                    else if (media_type === 'person') film = FaUser;

                    return (
                        <Box
                            key={id}
                            as="li"
                            _hover={{
                                bgColor: 'gray.100'
                            }}
                            bgColor={
                                currSelection - 1 === index
                                    ? 'gray.100'
                                    : 'white'
                            }
                            cursor="pointer"
                            onClick={() => goToEntity(media_type, id)}
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
                                <Text fontSize="sm" noOfLines={1}>
                                    {name || title}
                                </Text>
                            </HStack>
                        </Box>
                    );
                })}
        </VStack>
    );
};

export default SearchBarResults;
