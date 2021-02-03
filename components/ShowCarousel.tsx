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
    const noOfSlides = useBreakpointValue([3, 4, 5, 6, 7]);
    const naturalHeight = useBreakpointValue([2300, 2200, 2200, 2200]);

    return (
        <Box width="100%">
            <Box
                as={CarouselProvider}
                naturalSlideHeight={naturalHeight}
                naturalSlideWidth={1078}
                totalSlides={items.length}
                step={noOfSlides}
                dragStep={noOfSlides}
                visibleSlides={noOfSlides}
                infinite
            >
                {/* <AnimatePresence> */}

                <Box position="relative">
                    <Slider>
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
                                    key={`${name}-${id}`}
                                    index={index}
                                >
                                    <MotionBox
                                        opacity="0"
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ delay: 0.1 }}
                                    >
                                        <NextLink
                                            href={
                                                title
                                                    ? `/movies/${id}`
                                                    : `/tv/${id}`
                                            }
                                            passHref
                                        >
                                            <Link
                                                _hover={{
                                                    textDecor: 'none'
                                                }}
                                            >
                                                <Box position="relative">
                                                    <Image
                                                        src={`${base_url}${poster_sizes[2]}${poster_path}`}
                                                        alt={`${
                                                            name || title
                                                        } poster`}
                                                        height={276}
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
                                                        fontSize={[
                                                            '0.8rem',
                                                            '1rem',
                                                            '1.2rem',
                                                            '1.4rem',
                                                            '1.5rem'
                                                        ]}
                                                        color="yellow.400"
                                                        mr="5px"
                                                    />
                                                    <Text
                                                        fontSize={[
                                                            '0.75rem',
                                                            '0.78rem',
                                                            '0.95rem',
                                                            '1rem',
                                                            '1.1rem'
                                                        ]}
                                                    >
                                                        {vote_count > 0
                                                            ? vote_average
                                                            : 'NR'}
                                                    </Text>
                                                </Flex>

                                                <Heading
                                                    fontSize={[
                                                        '0.7rem',
                                                        '0.78rem',
                                                        '0.95rem',
                                                        '1rem',
                                                        '1.1rem'
                                                    ]}
                                                    noOfLines={3}
                                                >
                                                    {name || title}
                                                </Heading>
                                            </Link>
                                        </NextLink>
                                    </MotionBox>
                                </Box>
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
                {/* </AnimatePresence> */}
            </Box>
        </Box>
    );
}

export default ShowCarousel;
