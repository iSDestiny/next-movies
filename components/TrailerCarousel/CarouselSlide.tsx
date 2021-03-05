import { Box, Flex, Heading, Icon, Link, VStack } from '@chakra-ui/react';
import { Slide } from 'pure-react-carousel';
import Image from 'next/image';
import MotionBox from '../MotionBox';
import NextLink from 'next/link';
import { useState } from 'react';
import VideoModal from 'components/VideoModal';
import { FaPlay } from 'react-icons/fa';

interface CarouselSlideProps {
    id: number;
    index: number;
    videos: VideoResultsEntity[];
    setTrailerMode: (index: number, status: boolean) => void;
    trailerModes: boolean[];
    config: TMDBConfig;
    backdrop_path: string;
    poster_path: string;
    name: string;
    title: string;
    media_type: string;
}

const CarouselSlide = ({
    id,
    index,
    videos,
    setTrailerMode,
    trailerModes,
    config,
    backdrop_path,
    poster_path,
    name,
    title,
    media_type
}: CarouselSlideProps) => {
    const { secure_base_url, poster_sizes, backdrop_sizes } = config.images;
    const [isHover, setIsHover] = useState(false);
    const [isHoverPoster, setIsHoverPoster] = useState(false);

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

    if (videos && videos.length <= 0) return null;
    return (
        <>
            <Slide
                index={index}
                tag="li"
                className="clickable"
                aria-label={`${name || title} slide`}
            >
                <Box height="100%" bgColor="rgba(0,0,0,0.8)">
                    <Box
                        onMouseEnter={() => setIsHover(true)}
                        onMouseLeave={() => setIsHover(false)}
                    >
                        <Box
                            cursor="pointer"
                            onClick={() => setTrailerMode(index, true)}
                        >
                            <Image
                                src={`${secure_base_url}${backdrop_sizes[2]}${backdrop_path}`}
                                alt={`${name || title} backdrop`}
                                layout="fill"
                                objectFit="fill"
                            />
                        </Box>
                        <MotionBox
                            whileHover={{
                                scale: 1.3
                            }}
                            animate={isHover ? 'mouseIn' : 'mouseOut'}
                            variants={hoverVariants}
                            onClick={() => setTrailerMode(index, true)}
                            position="absolute"
                            top="45%"
                            left="47%"
                            zIndex="20"
                        >
                            <Icon
                                as={FaPlay}
                                fontSize={['2rem', '2.5rem', '3rem']}
                                color="white"
                            />
                        </MotionBox>
                    </Box>
                    <Flex
                        onClick={() => setTrailerMode(index, true)}
                        onMouseEnter={() => setIsHover(true)}
                        onMouseLeave={() => setIsHover(false)}
                        zIndex="5"
                        position="absolute"
                        bottom="0"
                        bgGradient="linear(to-t, black, transparent)"
                        height={{ base: '100px', md: '200px' }}
                        alignItems="flex-end"
                        width="100%"
                        color="white"
                        p={['0.5rem', '1rem']}
                    >
                        <NextLink
                            href={
                                media_type === 'movie'
                                    ? `/movies/${id}`
                                    : `/tv/${id}`
                            }
                            passHref
                        >
                            <Link
                                flexShrink={0}
                                height={['90px', 134, 170, 230]}
                                width={['60px', 90, 114, 154]}
                                onMouseEnter={() => {
                                    setIsHoverPoster(true);
                                    setIsHover(false);
                                }}
                                onMouseLeave={() => {
                                    setIsHover(true);
                                    setIsHoverPoster(false);
                                }}
                                onClick={(e) => e.stopPropagation()}
                                position="relative"
                                color="transparent"
                            >
                                {`${name || title} poster`}
                                <Image
                                    src={
                                        poster_path
                                            ? `${secure_base_url}${poster_sizes[2]}${poster_path}`
                                            : '/images/default-placeholder-image.png'
                                    }
                                    alt={`${name || title} poster`}
                                    layout="fill"
                                    objectFit="contain"
                                />
                                <MotionBox
                                    zIndex="5"
                                    height="100%"
                                    width="100%"
                                    position="absolute"
                                    top="0"
                                    bgColor="rgba(0,0,0,0.3)"
                                    variants={posterHoverVariants}
                                    animate={
                                        isHoverPoster
                                            ? 'mouseInPoster'
                                            : 'mouseOutPoster'
                                    }
                                />
                            </Link>
                        </NextLink>
                        <NextLink
                            href={
                                media_type === 'movie'
                                    ? `/movies/${id}`
                                    : `/tv/${id}`
                            }
                            passHref
                        >
                            <Link
                                onMouseEnter={() => setIsHover(false)}
                                onMouseLeave={() => setIsHover(true)}
                                onClick={(e) => e.stopPropagation()}
                                _hover={{ textDecoration: 'underline' }}
                            >
                                <VStack
                                    spacing={['0.2rem', '0.3rem', '0.5rem']}
                                    alignItems="flex-start"
                                    ml={['0.5rem', '1rem', '1.5rem', '2rem']}
                                >
                                    <Heading
                                        as="h1"
                                        fontSize={[
                                            '16px',
                                            '20px',
                                            '24px',
                                            '28px'
                                        ]}
                                    >
                                        {name || title}
                                    </Heading>
                                    <Heading
                                        as="h2"
                                        fontSize={[
                                            '10px',
                                            '14px',
                                            '20px',
                                            '24px'
                                        ]}
                                    >
                                        {videos[0]?.name}
                                    </Heading>
                                </VStack>
                            </Link>
                        </NextLink>
                    </Flex>
                </Box>
            </Slide>

            <VideoModal
                url={`https://youtu.be/${videos[0].key}`}
                name={videos[0].name}
                isOpen={trailerModes[index]}
                onClose={() => setTrailerMode(index, false)}
            />
        </>
    );
};

export default CarouselSlide;
