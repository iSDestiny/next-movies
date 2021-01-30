import {
    Box,
    Flex,
    Heading,
    Icon,
    Link,
    Tooltip,
    VStack
} from '@chakra-ui/react';
import {
    CarouselProvider,
    Slider,
    Slide,
    ButtonBack,
    ButtonNext,
    Image as CarouselImage
} from 'pure-react-carousel';
import ModalVideo from 'react-modal-video';
import Image from 'next/image';
import ReactPlayer from 'react-player/youtube';
import { useState } from 'react';
import VideoModal from '../VideoModal';
import { FaAngleLeft, FaAngleRight, FaPlay } from 'react-icons/fa';
import { GrPrevious, GrNext } from 'react-icons/gr';
import MotionBox from '../MotionBox';
import NextLink from 'next/link';
import CarouselSlide from './CarouselSlide';

interface TrailerCarouselProps {
    results: Trending['results'];
    config: TMDBConfig;
    trailers: Video[];
}

const TrailerCarousel = ({
    results,
    config,
    trailers
}: TrailerCarouselProps) => {
    const [trailerModes, setTrailerModes] = useState<boolean[]>(
        [...Array(trailers.length).keys()].map(() => false)
    );

    const setTrailerMode = (index: number, status: boolean) => {
        setTrailerModes((prev) => {
            const newTrailer = [...prev];
            newTrailer[index] = status;
            return newTrailer;
        });
    };

    const totalSlides = results.filter(
        (res, index) => trailers[index].results.length > 0
    ).length;

    return (
        <Box w="1000px">
            <CarouselProvider
                naturalSlideHeight={563}
                naturalSlideWidth={1000}
                totalSlides={totalSlides}
                infinite
            >
                <Box position="relative">
                    <Slider>
                        {results.map(
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
                                const { results } = trailers[index];
                                if (results.length > 0)
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
                                return null;
                            }
                        )}
                    </Slider>
                    <Box
                        position="absolute"
                        top="45%"
                        left="1rem"
                        color="white"
                        zIndex="4"
                    >
                        <ButtonBack>
                            <Icon as={FaAngleLeft} fontSize="2.5rem" />
                        </ButtonBack>
                    </Box>
                    <Box
                        position="absolute"
                        top="45%"
                        right="1rem"
                        color="white"
                        zIndex="4"
                    >
                        <ButtonNext>
                            <Icon as={FaAngleRight} fontSize="2.5rem" />
                        </ButtonNext>
                    </Box>
                </Box>
            </CarouselProvider>
        </Box>
    );
};

export default TrailerCarousel;
