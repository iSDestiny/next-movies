import {
    Box,
    Heading,
    SimpleGrid,
    Skeleton,
    SkeletonText,
    Stack,
    useBreakpointValue,
    VStack
} from '@chakra-ui/react';
import GeneralLayout from 'layouts/GeneralLayout';
import SkeletonCreditSection from './PersonSkeletonCreditSection';
import PersonSkeletonSideData from './PersonSkeletonSideData';

const PersonPageSkeleton = () => {
    const isMobile = useBreakpointValue({ base: true, lg: false });
    const noOfSlides = useBreakpointValue([3, 4, 5, 6, 7]);

    return (
        <GeneralLayout title="Loading Person Data...">
            <Stack
                direction={{ base: 'column', lg: 'row' }}
                as="main"
                p="2rem 1rem"
                maxWidth="1400px"
                spacing="2rem"
                m="auto"
                align="flex-start"
            >
                <PersonSkeletonSideData />
                <VStack
                    width={{ base: '100%', lg: '78%' }}
                    as="main"
                    spacing="2rem"
                    align="flex-start"
                >
                    {!isMobile && (
                        <Skeleton>
                            <Heading as="h1" size="lg">
                                Dummy
                            </Heading>
                        </Skeleton>
                    )}
                    <Box as="section" width="100%">
                        <Heading size="md" mb="0.5rem">
                            Biography
                        </Heading>
                        <SkeletonText noOfLines={8} spacing="0.5rem" />
                    </Box>
                    <Box as="section" width="100%">
                        <Heading size="md" mb="0.5rem">
                            Known for
                        </Heading>
                        <SimpleGrid columns={noOfSlides} spacing="0.2rem">
                            {[...Array(noOfSlides).keys()].map((num) => (
                                <Skeleton
                                    key={num}
                                    width="100%"
                                    height={[130, 150, 160, 180, 200]}
                                />
                            ))}
                        </SimpleGrid>
                    </Box>
                    <SkeletonCreditSection heading="Acting" />
                    <SkeletonCreditSection heading="Production" />
                    <SkeletonCreditSection heading="Writing" />
                </VStack>
            </Stack>
        </GeneralLayout>
    );
};

export default PersonPageSkeleton;
