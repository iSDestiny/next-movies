import {
    Button,
    ButtonGroup,
    Heading,
    HStack,
    VStack,
    Text,
    useBreakpointValue
} from '@chakra-ui/react';
import { useState } from 'react';
import dynamic from 'next/dynamic';
const MediaCarousel = dynamic(import('./MediaCarousel'));
const VideoCarousel = dynamic(import('./VideoCarousel'));

export interface MediaGroupItem {
    type: 'poster' | 'backdrop' | 'video';
    items: Media[] | VideoResultsEntity[];
    width: number;
    height: number;
    noOfSlides: number;
}

interface MediaGroupProps {
    headingSize: string;
    media: MediaGroupItem[];
    title: string;
}

const MediaGroup = ({ headingSize, media, title }: MediaGroupProps) => {
    const [currentCarousel, setCurrentCarousel] = useState(0);
    const groupButtonSize = useBreakpointValue({
        base: 'xs',
        sm: 'sm',
        lg: 'md'
    });
    return (
        <VStack
            spacing="1rem"
            width="100%"
            align="flex-start"
            mb={{ base: '1rem', md: '3rem', xl: '4rem' }}
        >
            <HStack justify="flex-start" spacing="1.5rem">
                <Heading size={headingSize}>Media</Heading>
                <ButtonGroup size={groupButtonSize} isAttached>
                    {['Backdrops', 'Posters', 'Videos'].map((name, index) => (
                        <Button
                            key={name}
                            colorScheme="teal"
                            variant={
                                index === currentCarousel ? 'solid' : 'outline'
                            }
                            onClick={() => setCurrentCarousel(index)}
                        >
                            {`${name} (${media[index].items.length})`}
                        </Button>
                    ))}
                </ButtonGroup>
            </HStack>
            {media.map(({ width, height, items, noOfSlides, type }, index) => {
                if (currentCarousel === index) {
                    if (items.length > 0)
                        if (type === 'video')
                            return (
                                <VideoCarousel
                                    key={index}
                                    naturalHeight={height}
                                    naturalWidth={width}
                                    noOfSlides={noOfSlides}
                                    buttonSize={['1rem', '1.5rem', '2rem']}
                                    videos={items as VideoResultsEntity[]}
                                />
                            );
                        else
                            return (
                                <MediaCarousel
                                    key={index}
                                    naturalHeight={height}
                                    naturalWidth={width}
                                    name={title}
                                    items={items as Media[]}
                                    noOfSlides={noOfSlides}
                                    buttonSize={['1rem', '1.5rem', '2rem']}
                                />
                            );
                    return (
                        <Text
                            size="sm"
                            key={index}
                        >{`No ${type}s to display`}</Text>
                    );
                }
            })}
        </VStack>
    );
};

export default MediaGroup;
