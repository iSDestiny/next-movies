import {
    Box,
    Flex,
    Grid,
    GridItem,
    Heading,
    Skeleton,
    useBreakpointValue,
    VStack
} from '@chakra-ui/react';
import React from 'react';

const PersonSkeletonSideData = () => {
    const isMobile = useBreakpointValue({ base: true, lg: false });
    const dimensions = useBreakpointValue([
        [150, 225],
        [200, 300],
        [250, 375],
        [300, 450]
    ]);

    const headings = [
        'Known For',
        'Known Credits',
        'Gender',
        'Birthday',
        'Place of Birth',
        'Deathday'
    ];

    return (
        <VStack
            spacing="1rem"
            width={{ base: '100%', lg: '22%' }}
            as="aside"
            align="flex-start"
        >
            <Flex
                alignSelf={{ base: 'center', lg: 'flex-start' }}
                direction="column"
            >
                {dimensions && (
                    <Skeleton
                        className="border-round"
                        width={`${dimensions[0]}px`}
                        height={`${dimensions[1]}px`}
                    />
                )}
                {isMobile && (
                    <Skeleton mt="0.5rem">
                        <Heading textAlign="center" as="h1" size="lg">
                            Dummy
                        </Heading>
                    </Skeleton>
                )}
            </Flex>
            <Box width="100%">
                <Heading size="md">Personal Info</Heading>
                <Grid
                    gap="1rem"
                    width="100%"
                    mt="0.5rem"
                    as="main"
                    templateColumns={{ base: 'repeat(2, 1fr)', lg: '1fr' }}
                    templateRows={{ base: 'repeat(4, 1fr)', lg: null }}
                >
                    {headings.map((heading) => (
                        <GridItem as="section" key={heading}>
                            <Heading as="h3" size="sm" mb="0.2rem">
                                {heading}
                            </Heading>
                            <Skeleton height="20px" width="80px" />
                        </GridItem>
                    ))}
                    <GridItem
                        as="section"
                        rowStart={{ base: 1, lg: 'auto' }}
                        rowEnd={{ base: 5, lg: 'auto' }}
                        colStart={{ base: 2, lg: 'auto' }}
                        colEnd={{ base: 2, lg: 'auto' }}
                    >
                        <Heading as="h3" size="sm" mb="0.2em">
                            Also Known As
                        </Heading>
                        <VStack
                            as="ul"
                            align="flex-start"
                            listStyleType="none"
                            spacing="0.4rem"
                        >
                            {[...Array(8).keys()].map((num) => (
                                <Skeleton
                                    height="20px"
                                    width="80px"
                                    key={num}
                                />
                            ))}
                        </VStack>
                    </GridItem>
                </Grid>
            </Box>
        </VStack>
    );
};

export default PersonSkeletonSideData;
