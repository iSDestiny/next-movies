import { Skeleton, VStack, Wrap, WrapItem } from '@chakra-ui/react';
import Section from 'components/Section';
import React from 'react';

interface ShowPageSkeletonSideDataProps {
    mediaType: 'movie' | 'tv';
}

const ShowPageSkeletonSideData = ({ mediaType }) => {
    return (
        <VStack
            width={{ base: '100%', lg: '20%' }}
            pt={{ base: '2rem', lg: '0px' }}
            spacing="2rem"
            align="flex-start"
        >
            <Section
                heading={`Original ${mediaType === 'movie' ? 'Title' : 'Name'}`}
                spacing="0.5rem"
            >
                <Skeleton width="100px" height="20px" />
            </Section>
            <Section heading="Status" spacing="0.5rem">
                <Skeleton width="100px" height="20px" />
            </Section>
            {mediaType === 'tv' && (
                <>
                    <Section heading="Networks" spacing="0.5rem">
                        <VStack spacing="0.5rem" align="flex-start">
                            {[...Array(3).keys()].map((num) => (
                                <Skeleton width="120px" height="50px" />
                            ))}
                        </VStack>
                    </Section>
                    <Section heading="Type" spacing="0.5rem">
                        <Skeleton width="100px" height="20px" />
                    </Section>
                </>
            )}
            {mediaType === 'movie' && (
                <>
                    <Section heading="Budget" spacing="0.5rem">
                        <Skeleton width="100px" height="20px" />
                    </Section>
                    <Section heading="Revenue" spacing="0.5rem">
                        <Skeleton width="100px" height="20px" />
                    </Section>
                </>
            )}
            <Section heading="Original Language" spacing="0.5rem">
                <Skeleton width="100px" height="20px" />
            </Section>
            <Section heading="Keywords" spacing="0.5rem">
                <Wrap>
                    {[...Array(6).keys()].map((num) => (
                        <WrapItem key={num}>
                            <Skeleton width="80px" height="30px" />
                        </WrapItem>
                    ))}
                </Wrap>
            </Section>
        </VStack>
    );
};

export default ShowPageSkeletonSideData;
