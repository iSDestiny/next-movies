import {
    Box,
    Flex,
    Heading,
    HStack,
    Skeleton,
    SkeletonText,
    useBreakpointValue,
    useColorMode,
    VStack,
    Wrap,
    WrapItem
} from '@chakra-ui/react';
import DotDivider from 'components/DotDivider';
import { FaStar, FaRegStar } from 'react-icons/fa';
import replaceSpacesWithDashes from 'utils/replaceSpacesWithDashes';

const ShowPageSkeletonMobileHeader = () => {
    const bgOpacity = useBreakpointValue({ base: '0', md: '0.84' });
    const posterWidth = useBreakpointValue([
        '100px',
        '150px',
        '250px',
        '300px'
    ]);
    const posterHeight = useBreakpointValue([
        '150px',
        '225px',
        '375px',
        '450px'
    ]);
    const { colorMode } = useColorMode();
    return (
        <VStack
            bgColor={colorMode === 'light' ? 'gray.800' : 'gray.700'}
            width="100%"
            display={{ base: 'flex', md: 'none' }}
            color="white"
            p="1rem"
            spacing="1rem"
        >
            <Skeleton width="150px" height="19px" />
            <HStack spacing="1rem" align="center">
                <Skeleton width="35px" height="30px" />
                <Skeleton width="125px" height="30px" />
            </HStack>
            <HStack spacing="0.5rem" align="center">
                <Skeleton width="30px" height="20px" />
                <Skeleton width="70px" height="16px" />
                <DotDivider size="5px" color="white" />
                <Skeleton width="50px" height="20px" />
            </HStack>
            <Wrap spacing="0.5rem" justify="center">
                {[...Array(4).keys()].map((num) => (
                    <WrapItem key={num}>
                        <Skeleton width="50px" height="20px" />
                    </WrapItem>
                ))}
            </Wrap>

            <Skeleton width="100%" maxWidth="300px" height="20px" />
            <VStack spacing="0.5rem" align="flex-start" width="100%">
                <Heading size="md" textAlign="left">
                    Overview
                </Heading>
                <SkeletonText noOfLines={10} width="100%" />
            </VStack>
        </VStack>
    );
};

const ShowPageSkeletonHeader = () => {
    const posterWidth = useBreakpointValue([
        '100px',
        '150px',
        '250px',
        '300px'
    ]);
    const posterHeight = useBreakpointValue([
        '150px',
        '225px',
        '375px',
        '450px'
    ]);

    const bgOpacity = useBreakpointValue({ base: '0', md: '0.84' });
    return (
        <Box as="header" width="100%">
            <Box bgColor={{ base: 'black', md: 'white' }} position="relative">
                <Box
                    position="absolute"
                    zIndex="0"
                    width="100%"
                    height="100%"
                    bgGradient={`linear(to-r, rgba(0,0,0,1) ${posterWidth}, rgba(0,0,0,${bgOpacity}))`}
                />
                <HStack
                    p="2rem 1rem"
                    zIndex="2"
                    maxWidth="1400px"
                    margin="auto"
                    padding="1.5rem 2rem"
                    position="relative"
                    justify="flex-start"
                    align="center"
                    spacing="2rem"
                    color="white"
                    width="100%"
                >
                    <Skeleton
                        borderRadius="10px"
                        minWidth={posterWidth}
                        height={posterHeight}
                        bgColor="white"
                        position="relative"
                    />
                    <VStack
                        zIndex="2"
                        justify="flex-start"
                        align="flex-start"
                        py="2.5rem"
                        spacing="1rem"
                        display={{ base: 'none', md: 'flex' }}
                        width="100%"
                    >
                        <Box color="white">
                            <Skeleton
                                width="100%"
                                maxWidth="200px"
                                height="20px"
                                mb="0.5rem"
                            />
                            <HStack spacing="0.5rem" align="center">
                                <Skeleton width="20px" height="20px" />
                                <Skeleton width="70px" height="16px" />
                                <DotDivider size="5px" color="white" />
                                <Wrap spacing="0.5rem">
                                    {[...Array(4).keys()].map((num) => (
                                        <WrapItem key={num}>
                                            <Skeleton
                                                width="50px"
                                                height="20px"
                                            />
                                        </WrapItem>
                                    ))}
                                </Wrap>
                                <DotDivider size="5px" color="white" />
                                <Skeleton width="50px" height="20px" />
                            </HStack>
                        </Box>
                        <HStack spacing="1rem" align="center">
                            <Skeleton width="35px" height="35px" />
                            <Skeleton width="135px" height="35px" />
                        </HStack>
                        <Skeleton width="100%" maxWidth="300px" height="20px" />
                        <VStack
                            spacing="0.5rem"
                            align="flex-start"
                            width="100%"
                        >
                            <Heading size="md">Overview</Heading>
                            <SkeletonText noOfLines={10} width="100%" />
                        </VStack>
                    </VStack>
                </HStack>
            </Box>
            <ShowPageSkeletonMobileHeader />
        </Box>
    );
};

export default ShowPageSkeletonHeader;
