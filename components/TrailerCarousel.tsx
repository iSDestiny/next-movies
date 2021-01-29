import { Box, Icon } from '@chakra-ui/react';
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
import VideoModal from './VideoModal';
import { FaAngleLeft, FaAngleRight, FaPlay } from 'react-icons/fa';
import { GrPrevious, GrNext } from 'react-icons/gr';
import MotionBox from './MotionBox';

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
    const { base_url, poster_sizes, backdrop_sizes } = config.images;
    const [trailerModes, setTrailerModes] = useState<boolean[]>(
        [...Array(trailers.length).keys()].map(() => false)
    );
    const [isHover, setIsHover] = useState(false);

    const setTrailerMode = (index: number, status: boolean) => {
        setTrailerModes((prev) => {
            const newTrailer = [...prev];
            newTrailer[index] = status;
            return newTrailer;
        });
    };

    const hoverVariants = {
        mouseIn: {
            scale: 1.3
        },
        mouseOut: {
            scale: 1
        }
    };

    const totalSlides = results.filter(
        (res, index) => trailers[index].results.length > 0
    ).length;

    return (
        <Box w="700px">
            <CarouselProvider
                naturalSlideHeight={400}
                naturalSlideWidth={700}
                totalSlides={totalSlides}
                infinite
            >
                <Box position="relative">
                    <Slider>
                        {results.map(
                            (
                                {
                                    backdrop_path,
                                    original_name,
                                    poster_path,
                                    id
                                },
                                index
                            ) => {
                                const { results } = trailers[index];
                                if (results.length > 0)
                                    return (
                                        <Box key={id} cursor="pointer">
                                            <>
                                                {/* <Image
                                                    src={`${base_url}${poster_sizes[2]}${poster_path}`}
                                                    alt={`${original_name} poster`}
                                                    width={200}
                                                    height={400}
                                                /> */}
                                                <Slide index={index}>
                                                    <Box
                                                        onMouseEnter={() =>
                                                            setIsHover(true)
                                                        }
                                                        onMouseLeave={() =>
                                                            setIsHover(false)
                                                        }
                                                    >
                                                        <Box
                                                            cursor="pointer"
                                                            onClick={() =>
                                                                setTrailerMode(
                                                                    index,
                                                                    true
                                                                )
                                                            }
                                                        >
                                                            <Image
                                                                src={`${base_url}${backdrop_sizes[1]}${backdrop_path}`}
                                                                alt={`${original_name} backdrop`}
                                                                width={780}
                                                                height={400}
                                                            />
                                                        </Box>
                                                        <MotionBox
                                                            whileHover={{
                                                                scale: 1.3
                                                            }}
                                                            animate={
                                                                isHover
                                                                    ? 'mouseIn'
                                                                    : 'mouseOut'
                                                            }
                                                            variants={
                                                                hoverVariants
                                                            }
                                                            onClick={() =>
                                                                setTrailerMode(
                                                                    index,
                                                                    true
                                                                )
                                                            }
                                                            position="absolute"
                                                            top="35%"
                                                            left="46%"
                                                            zIndex="20"
                                                        >
                                                            <Icon
                                                                as={FaPlay}
                                                                fontSize="3.5rem"
                                                                color="white"
                                                            />
                                                        </MotionBox>
                                                    </Box>
                                                </Slide>
                                            </>

                                            <VideoModal
                                                url={`https://youtu.be/${results[0].key}`}
                                                name={results[0].name}
                                                isOpen={trailerModes[index]}
                                                onClose={() =>
                                                    setTrailerMode(index, false)
                                                }
                                            />
                                        </Box>
                                    );
                                return null;
                            }
                        )}
                    </Slider>
                    <Box
                        position="absolute"
                        top="40%"
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
                        top="40%"
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
