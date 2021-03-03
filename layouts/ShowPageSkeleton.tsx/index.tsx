import {
    AspectRatio,
    Box,
    HStack,
    Skeleton,
    Stack,
    useBreakpointValue,
    VStack
} from '@chakra-ui/react';
import Section from 'components/Section';
import GeneralLayout from 'layouts/GeneralLayout';
import ShowPageSkeletonHeader from './ShowPageSkeletonHeader';
import ShowPageSkeletonSideData from './ShowPageSkeletonSideData';

interface ShowPageSkeletonProps {
    mediaType: 'movie' | 'tv';
}

const ShowPageSkeleton = ({ mediaType }: ShowPageSkeletonProps) => {
    const showSlides = useBreakpointValue([3, 3, 4, 4, 5]);
    const castSlides = useBreakpointValue([3, 4, 5, 5, 6]);
    const backdropSlides = useBreakpointValue({ base: 1, sm: 2 });

    return (
        <GeneralLayout title="Loading...">
            <Box as="main">
                <ShowPageSkeletonHeader />
                <Stack
                    as="main"
                    p="2rem 1rem"
                    width="100%"
                    maxWidth="1400px"
                    margin="auto"
                    spacing={{ base: 0, lg: '1.5rem' }}
                    align="flex-start"
                    direction={{ base: 'column', lg: 'row' }}
                >
                    <VStack
                        width={{ base: '100%', lg: '80%' }}
                        spacing="2rem"
                        align="flex-start"
                    >
                        <Section heading="Cast" spacing="1rem">
                            <HStack spacing="0.5rem" width="100%">
                                {[...Array(castSlides).keys()].map((num) => (
                                    <AspectRatio
                                        width="100%"
                                        maxWidth="138px"
                                        ratio={138 / 178}
                                        key={num}
                                    >
                                        <Skeleton width="100%" />
                                    </AspectRatio>
                                ))}
                            </HStack>
                        </Section>
                        <Section heading="Media" spacing="1rem">
                            <HStack spacing="0.5rem" width="100%">
                                {[...Array(backdropSlides).keys()].map(
                                    (num) => (
                                        <AspectRatio
                                            width="100%"
                                            maxWidth="500px"
                                            ratio={533 / 300}
                                            key={num}
                                        >
                                            <Skeleton width="100%" />
                                        </AspectRatio>
                                    )
                                )}
                            </HStack>
                        </Section>
                        <Section heading="Recommendations" spacing="1rem">
                            <HStack spacing="0.5rem" width="100%">
                                {[...Array(showSlides).keys()].map((num) => (
                                    <AspectRatio
                                        maxWidth="185px"
                                        width="100%"
                                        ratio={185 / 276}
                                        key={num}
                                    >
                                        <Skeleton width="100%" />
                                    </AspectRatio>
                                ))}
                            </HStack>
                        </Section>
                        <Section heading="Similar" spacing="1rem">
                            <HStack spacing="0.5rem" width="100%">
                                {[...Array(showSlides).keys()].map((num) => (
                                    <AspectRatio
                                        width="100%"
                                        maxWidth="185px"
                                        ratio={185 / 276}
                                        key={num}
                                    >
                                        <Skeleton width="100%" />
                                    </AspectRatio>
                                ))}
                            </HStack>
                        </Section>
                    </VStack>
                    <ShowPageSkeletonSideData mediaType={mediaType} />
                </Stack>
            </Box>
        </GeneralLayout>
    );
};

export default ShowPageSkeleton;
