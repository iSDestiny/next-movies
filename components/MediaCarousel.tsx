import { Box, Icon } from '@chakra-ui/react';
import {
    ButtonBack,
    ButtonNext,
    CarouselProvider,
    Slider,
    Slide,
    CarouselProvider
} from 'pure-react-carousel';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

interface MediaCarouselProps<T> {
    naturalHeight: number;
    naturalWidth: number;
    noOfSlides: number;
    buttonSize: string | string[];
    items: T[];
}

function MediaCarousel<T>({
    naturalHeight,
    naturalWidth,
    noOfSlides,
    buttonSize,
    items
}: MediaCarouselProps<T>) {
    return (
        <Box width="100%">
            <Box
                as={CarouselProvider}
                naturalSlideHeight={naturalHeight}
                naturalSlideWidth={naturalWidth}
                totalSlides={items.length}
                step={noOfSlides}
                dragStep={noOfSlides}
                visibleSlides={noOfSlides}
                infinite
            >
                <Box position="relative">
                    <Slider></Slider>
                    <Box
                        p="4px"
                        position="absolute"
                        top="25%"
                        left="1rem"
                        color="white"
                        zIndex="4"
                        display={{ base: 'none', md: 'block' }}
                        bgColor="rgba(0,0,0,0.7)"
                        borderRadius="20%"
                    >
                        <ButtonBack>
                            <Icon as={FaAngleLeft} fontSize={buttonSize} />
                        </ButtonBack>
                    </Box>
                    <Box
                        p="4px"
                        position="absolute"
                        top="25%"
                        right="1.35rem"
                        color="white"
                        zIndex="4"
                        display={{ base: 'none', md: 'block' }}
                        bgColor="rgba(0,0,0,0.7)"
                        borderRadius="20%"
                    >
                        <ButtonNext>
                            <Icon as={FaAngleRight} fontSize={buttonSize} />
                        </ButtonNext>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

export default MediaCarousel;
