import { Box, Skeleton, Text, VStack } from '@chakra-ui/react';

interface SearchBarLoadingProps {
    isLoading: boolean;
    query: string;
}

const SearchBarLoading = ({ isLoading, query }: SearchBarLoadingProps) => {
    return (
        <VStack
            as="ul"
            listStyleType="none"
            spacing="0.3rem"
            width="100%"
            display={query.trim().length > 0 ? 'flex' : 'none'}
            align="center"
            justify="center"
            borderBottom="1px solid #BDC6C7"
        >
            <Box
                as="li"
                maxWidth="1400px"
                m="auto"
                p="0.5rem 1rem"
                width="100%"
            >
                {!isLoading ? (
                    <Text size="lg" p="1rem" fontWeight="bold" color="black">
                        No results
                    </Text>
                ) : (
                    <VStack spacing="0.5rem">
                        {[...Array(10).keys()].map((num) => (
                            <Skeleton
                                height="16px"
                                width="100%"
                                key={num}
                                startColor="gray.200"
                                endColor="gray.400"
                            />
                        ))}
                    </VStack>
                )}
            </Box>
        </VStack>
    );
};

export default SearchBarLoading;
