import {
    Link,
    Box,
    Text,
    Heading,
    Icon,
    useBreakpointValue,
    Flex,
    Tooltip
} from '@chakra-ui/react';
import {
    ButtonBack,
    ButtonNext,
    CarouselProvider,
    Slider,
    Slide
} from 'pure-react-carousel';
import Image from 'next/image';
import NextLink from 'next/link';
import { FaAngleLeft, FaAngleRight, FaRegStar, FaStar } from 'react-icons/fa';
import MotionBox from './MotionBox';
import { AnimatePresence } from 'framer-motion';
import Rating from './Rating';
import useDimensions from 'react-cool-dimensions';
import { createRef, useEffect, useRef, useState } from 'react';
import Carousel from './Carousel';

interface ShowCarouselProps {
    name: string;
    items: any[];
    base_url: string;
    poster_sizes: string[];
    noOfSlides: number;
    naturalHeight: number;
    starSize: string | string[];
    ratingSize: string | string[];
    headingSize: string | string[];
    buttonSize: string | string[];
}

function ShowCarousel({
    name: carouselName,
    items,
    base_url,
    poster_sizes,
    noOfSlides,
    naturalHeight,
    starSize,
    ratingSize,
    headingSize,
    buttonSize
}: ShowCarouselProps) {
    const { width, observe } = useDimensions<HTMLDivElement>();

    if (items.length > 0)
        return (
            <Carousel
                buttonSize={buttonSize}
                noOfSlides={noOfSlides}
                naturalWidth={1078}
                naturalHeight={naturalHeight}
                totalSlides={items.length}
                buttonYPos="25%"
                buttonXPos="1.35rem"
            >
                {items.map(
                    (
                        {
                            title,
                            name,
                            id,
                            vote_average,
                            vote_count,
                            poster_path
                        },
                        index
                    ) => (
                        <Box
                            as={Slide}
                            tag="li"
                            key={`${carouselName}-${
                                name || title
                            }-${id}-${index}`}
                            index={index}
                        >
                            <MotionBox
                                opacity="0"
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ delay: 0.1 }}
                            >
                                <NextLink
                                    href={title ? `/movies/${id}` : `/tv/${id}`}
                                    passHref
                                >
                                    <Link
                                        _hover={{
                                            textDecor: 'none'
                                        }}
                                    >
                                        <Box ref={observe}>
                                            <Box position="relative" id="hello">
                                                <Image
                                                    src={
                                                        poster_path
                                                            ? `${base_url}${poster_sizes[2]}${poster_path}`
                                                            : '/images/default-placeholder-image.png'
                                                    }
                                                    alt={`${
                                                        name || title
                                                    } poster`}
                                                    height={278}
                                                    width={185}
                                                />
                                            </Box>
                                            <Flex align="center" mb="2px">
                                                <Icon
                                                    as={
                                                        vote_count > 0
                                                            ? FaStar
                                                            : FaRegStar
                                                    }
                                                    fontSize={starSize}
                                                    color="yellow.400"
                                                    mr="5px"
                                                />
                                                <Text fontSize={ratingSize}>
                                                    {vote_count > 0
                                                        ? vote_average
                                                        : 'NR'}
                                                </Text>
                                            </Flex>

                                            <Heading
                                                fontSize={headingSize}
                                                noOfLines={3}
                                                width={
                                                    width > 185 ? 185 : width
                                                }
                                            >
                                                {name || title}
                                            </Heading>
                                        </Box>
                                    </Link>
                                </NextLink>
                            </MotionBox>
                        </Box>
                    )
                )}
            </Carousel>
        );
    return null;
}

export default ShowCarousel;
