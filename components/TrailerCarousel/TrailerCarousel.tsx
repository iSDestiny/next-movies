import { Box, Icon, Stack } from '@chakra-ui/react';
import {
    ButtonBack,
    ButtonNext,
    CarouselProvider,
    Slider
} from 'pure-react-carousel';
import { useState } from 'react';
import useDimensions from 'react-cool-dimensions';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import CarouselSlide from './CarouselSlide';
import Thumbnails from './Thumbnails';

interface TrailerCarouselProps {
    results: Trending['results'];
    config: TMDBConfig;
    trailers: Videos[];
}

const TrailerCarousel = ({
    results,
    config,
    trailers
}: TrailerCarouselProps) => {
    if (!results || !trailers) return null;

    const filteredResults = results.filter(
        (_, index) =>
            trailers[index] &&
            trailers[index].results &&
            trailers[index].results.length > 0
    );
    const filteredVideos = trailers.filter(
        (trailer) => trailer && trailer.results.length > 0
    );
    const totalSlides = filteredResults.length;
    const [trailerModes, setTrailerModes] = useState<boolean[]>(
        [...Array(filteredVideos.length).keys()].map(() => false)
    );
    const { ref, height } = useDimensions<HTMLDivElement>();

    const setTrailerMode = (index: number, status: boolean) => {
        setTrailerModes((prev) => {
            const newTrailer = [...prev];
            newTrailer[index] = status;
            return newTrailer;
        });
    };

    return (
        <Stack
            as={CarouselProvider}
            w="100%"
            flexShrink={0}
            spacing="5px"
            direction={{ base: 'column', lg: 'row' }}
            justify="center"
            naturalSlideHeight={675}
            naturalSlideWidth={1200}
            totalSlides={totalSlides}
            infinite
        >
            <Box position="relative" w="100%">
                <Box ref={ref}>
                    <Slider aria-label="Trailer Carousel">
                        {filteredResults.map(
                            (
                                {
                                    backdrop_path,
                                    name,
                                    title,
                                    poster_path,
                                    id,
                                    media_type
                                },
                                index
                            ) => {
                                const { results } = filteredVideos[index];
                                return (
                                    <CarouselSlide
                                        key={id}
                                        {...{
                                            backdrop_path,
                                            name,
                                            title,
                                            poster_path,
                                            id,
                                            media_type,
                                            videos: results,
                                            config,
                                            trailerModes,
                                            setTrailerMode,
                                            index
                                        }}
                                    />
                                );
                            }
                        )}
                    </Slider>
                </Box>
                <Box
                    p="4px"
                    position="absolute"
                    top="45%"
                    left="1rem"
                    color="white"
                    zIndex="2"
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
                    top="45%"
                    right="1rem"
                    color="white"
                    zIndex="2"
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
            <Thumbnails
                config={config}
                trendingResults={filteredResults}
                height={height}
            />
        </Stack>
    );
};

export default TrailerCarousel;
