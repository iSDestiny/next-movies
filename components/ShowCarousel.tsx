import { Box, Heading } from '@chakra-ui/react';
import {
    ButtonBack,
    ButtonNext,
    CarouselProvider,
    Slider,
    Slide
} from 'pure-react-carousel';
import Image from 'next/image';

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
                naturalSlideHeight={2400}
                naturalSlideWidth={1078}
                totalSlides={items.length}
                step={7}
                dragStep={7}
                visibleSlides={7}
                infinite
            >
                <Box>
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
                    <Box>
                        <ButtonBack>back</ButtonBack>
                        <ButtonNext>next</ButtonNext>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

export default ShowCarousel;
