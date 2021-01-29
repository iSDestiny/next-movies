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
import VideoModal from './VideoModal';
import { FaAngleLeft, FaAngleRight, FaPlay } from 'react-icons/fa';
import { GrPrevious, GrNext } from 'react-icons/gr';
import MotionBox from './MotionBox';
import NextLink from 'next/link';

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
    const [isHoverPoster, setIsHoverPoster] = useState(false);

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

    const posterHoverVariants = {
        mouseInPoster: {
            opacity: 1
        },
        mouseOutPoster: {
            opacity: 0
        }
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
                                        <Box key={id} cursor="pointer">
                                            <>
                                                <Slide index={index}>
                                                    <Box
                                                        height="100%"
                                                        bgColor="rgba(0,0,0,0.8)"
                                                    >
                                                        <Box
                                                            onMouseEnter={() =>
                                                                setIsHover(true)
                                                            }
                                                            onMouseLeave={() =>
                                                                setIsHover(
                                                                    false
                                                                )
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
                                                                    alt={`${
                                                                        name ||
                                                                        title
                                                                    } backdrop`}
                                                                    width={1000}
                                                                    height={563}
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
                                                                top="42%"
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
                                                        <Flex
                                                            onClick={() =>
                                                                setTrailerMode(
                                                                    index,
                                                                    true
                                                                )
                                                            }
                                                            onMouseEnter={() =>
                                                                setIsHover(true)
                                                            }
                                                            onMouseLeave={() =>
                                                                setIsHover(
                                                                    false
                                                                )
                                                            }
                                                            zIndex="5"
                                                            position="absolute"
                                                            bottom="0"
                                                            bgGradient="linear(to-t, black, transparent)"
                                                            height="200px"
                                                            alignItems="flex-end"
                                                            width="100%"
                                                            color="white"
                                                            p="1rem"
                                                        >
                                                            <NextLink
                                                                href={
                                                                    media_type ===
                                                                    'movie'
                                                                        ? `/movies/${id}`
                                                                        : `/tv/${id}`
                                                                }
                                                                passHref
                                                            >
                                                                <Link
                                                                    height="230px"
                                                                    onMouseEnter={() => {
                                                                        setIsHoverPoster(
                                                                            true
                                                                        );
                                                                        setIsHover(
                                                                            false
                                                                        );
                                                                    }}
                                                                    onMouseLeave={() => {
                                                                        setIsHover(
                                                                            true
                                                                        );
                                                                        setIsHoverPoster(
                                                                            false
                                                                        );
                                                                    }}
                                                                    onClick={(
                                                                        e
                                                                    ) =>
                                                                        e.stopPropagation()
                                                                    }
                                                                    position="relative"
                                                                >
                                                                    <Image
                                                                        src={`${base_url}${poster_sizes[1]}${poster_path}`}
                                                                        alt={`${
                                                                            name ||
                                                                            title
                                                                        } poster`}
                                                                        width={
                                                                            154
                                                                        }
                                                                        height={
                                                                            230
                                                                        }
                                                                    />
                                                                    <MotionBox
                                                                        zIndex="5"
                                                                        height="100%"
                                                                        width="100%"
                                                                        position="absolute"
                                                                        top="0"
                                                                        bgColor="rgba(0,0,0,0.3)"
                                                                        variants={
                                                                            posterHoverVariants
                                                                        }
                                                                        animate={
                                                                            isHoverPoster
                                                                                ? 'mouseInPoster'
                                                                                : 'mouseOutPoster'
                                                                        }
                                                                    />
                                                                </Link>
                                                            </NextLink>
                                                            <VStack
                                                                spacing="0.5rem"
                                                                alignItems="flex-start"
                                                                ml="2rem"
                                                            >
                                                                <Heading
                                                                    as="h1"
                                                                    size="lg"
                                                                >
                                                                    {name ||
                                                                        title}
                                                                </Heading>
                                                                <Heading
                                                                    as="h2"
                                                                    size="md"
                                                                >
                                                                    {
                                                                        results[0]
                                                                            .name
                                                                    }
                                                                </Heading>
                                                            </VStack>
                                                        </Flex>
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
