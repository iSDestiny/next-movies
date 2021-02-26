import {
    Box,
    Heading,
    VStack,
    HStack,
    Skeleton,
    useColorMode,
    useToken
} from '@chakra-ui/react';
import React from 'react';

interface Props {
    heading: string;
}

const SkeletonCreditSection = ({ heading }: Props) => {
    const { colorMode } = useColorMode();
    const [gray300, gray700] = useToken('colors', ['gray.300', 'gray.700']);
    const borderColor = colorMode === 'light' ? gray300 : gray700;

    return (
        <Box as="section" width="100%">
            <Heading size="md" mb="0.5rem">
                {heading}
            </Heading>
            <VStack
                boxShadow={`0px 1px 8px rgba(0,0,0,${
                    colorMode === 'light' ? 0.2 : 0.8
                })`}
                width="100%"
                align="flex-start"
                border={`1px solid ${borderColor}`}
                p="0.5rem"
                spacing="1rem"
            >
                {[...Array(15).keys()].map((num) => (
                    <HStack spacing="0.5rem" width="100%" key={num}>
                        <Skeleton width="10%" height="24px" />
                        <Skeleton width="40%" height="24px" />
                        <Skeleton width="40%" height="24px" />
                        <Skeleton width="10%" height="24px" />
                    </HStack>
                ))}
            </VStack>
        </Box>
    );
};

export default SkeletonCreditSection;
