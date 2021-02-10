import { Box, Icon, Link } from '@chakra-ui/react';
import {
    ButtonBack,
    ButtonNext,
    CarouselProvider,
    Slider,
    Slide
} from 'pure-react-carousel';
import Image from 'next/image';
import NextLink from 'next/link';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import MotionBox from './MotionBox';

interface MediaCarouselProps {
    naturalHeight: number;
    naturalWidth: number;
    noOfSlides: number;
    buttonSize: string | string[];
    items: Media[];
    name: string;
}

function MediaCarousel({
    naturalHeight,
    naturalWidth,
    noOfSlides,
    buttonSize,
    items,
    name
}: MediaCarouselProps) {
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
                    <Slider>
                        {items.map(({ path, original }, index) => (
                            <Slide key={`${path}-${index}`} index={index}>
                                <MotionBox animate={{ opacity: 1 }} opacity={0}>
                                    <NextLink href={original} passHref>
                                        <Link target="_blank">
                                            <Image
                                                alt={`${name}-${index}`}
                                                src={path}
                                                width={naturalWidth}
                                                height={naturalHeight}
                                            />
                                        </Link>
                                    </NextLink>
                                </MotionBox>
                            </Slide>
                        ))}
                    </Slider>
                    <Box
                        p="4px"
                        position="absolute"
                        top="40%"
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
                        top="40%"
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
