import { Box, Heading, Icon } from '@chakra-ui/react';
import {
    ButtonBack,
    ButtonNext,
    CarouselProvider,
    Slider,
    Slide
} from 'pure-react-carousel';
import Image from 'next/image';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

interface ShowCarouselProps {
    name: string;
    items: any[];
    base_url: string;
    poster_sizes: string[];
}

function ShowCarousel({
    name,
    items,
    base_url,
    poster_sizes
}: ShowCarouselProps) {
    return (
        <Box width="100%">
            <Box
                as={CarouselProvider}
                naturalSlideHeight={2000}
                naturalSlideWidth={1078}
                totalSlides={items.length}
                step={7}
                dragStep={7}
                visibleSlides={7}
                infinite
            >
                <Box position="relative">
                    <Slider>
                        {items.map(
                            (
                                { title, name, id, vote_average, poster_path },
                                index
                            ) => (
                                <Slide key={id} index={index}>
                                    <Box>
                                        <Image
                                            src={`${base_url}${poster_sizes[2]}${poster_path}`}
                                            alt={`${name || title} poster`}
                                            height={276}
                                            width={185}
                                        />
                                        <Heading size="md">
                                            {name || title}
                                        </Heading>
                                    </Box>
                                </Slide>
                            )
                        )}
                    </Slider>
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
                            <Icon
                                as={FaAngleLeft}
                                fontSize={['1.5rem', '2rem', '2.5rem']}
                            />
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
                            <Icon
                                as={FaAngleRight}
                                fontSize={['1.5rem', '2rem', '2.5rem']}
                            />
                        </ButtonNext>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

export default ShowCarousel;
