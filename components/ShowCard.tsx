import {
    Box,
    Flex,
    Heading,
    Text,
    useColorMode,
    useToken,
    VStack,
    Link,
    useBreakpointValue,
    HStack,
    Icon,
    Divider
} from '@chakra-ui/react';
import NextLink from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { FaRegStar, FaStar } from 'react-icons/fa';
import DotDivider from './DotDivider';

interface ShowCardProps {
    config: TMDBConfig;
    posterPath: string;
    title: string;
    date: string;
    overview: string;
    rating: number;
    href: string;
}

const ShowCard = ({
    config,
    posterPath,
    title,
    date,
    rating,
    overview,
    href
}: ShowCardProps) => {
    const { colorMode } = useColorMode();
    const { secure_base_url, poster_sizes } = config.images;
    const [isFocused, setIsFocused] = useState(false);
    const size = useBreakpointValue({ base: 'xs', lg: 'sm' });
    const [gray300, gray700] = useToken('colors', ['gray.300', 'gray.700']);
    const cardBorderColor = colorMode === 'light' ? gray300 : gray700;
    const cardAccentColor = colorMode === 'light' ? 'gray.600' : 'gray.400';
    const focusColor = colorMode === 'light' ? 'gray.100' : 'gray.700';
    const posterSrc = posterPath
        ? `${secure_base_url}${poster_sizes[1]}${posterPath}`
        : '/images/default-placeholder-image.png';

    return (
        <NextLink href={href} passHref>
            <Link
                _focus={{ outline: 'none' }}
                aria-label={title}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
            >
                <Flex
                    bgColor={isFocused ? focusColor : 'transparent'}
                    border={`1px solid ${cardBorderColor}`}
                    _hover={{ bgColor: focusColor }}
                    width="100%"
                    height="100%"
                    overflow="hidden"
                    borderRadius="8px"
                    boxShadow={`2px 3px 6px rgba(0,0,0,${
                        colorMode === 'light' ? 0.2 : 0.8
                    })}`}
                >
                    <Box
                        width={{ base: '90px', lg: '110px' }}
                        height="100%"
                        position="relative"
                    >
                        <Image
                            src={posterSrc}
                            layout="fill"
                            alt={`${title} poster`}
                        />
                    </Box>
                    <VStack
                        width={{
                            base: 'calc(100% - 90px)',
                            lg: 'calc(100% - 110px)'
                        }}
                        spacing="1rem"
                        align="flex-start"
                        p={{ base: '0.5rem', lg: '1rem' }}
                    >
                        <Box as="header">
                            <Heading as="h3" size={size} noOfLines={2}>
                                {title}
                            </Heading>
                            <HStack spacing="0.5rem" align="center">
                                <HStack
                                    display="inline-flex"
                                    align="center"
                                    spacing="0.2rem"
                                >
                                    <Icon
                                        as={rating > 0 ? FaStar : FaRegStar}
                                        color="yellow.400"
                                    />
                                    <Text
                                        as="span"
                                        fontSize={{
                                            base: '0.8rem',
                                            lg: '1rem'
                                        }}
                                        color={cardAccentColor}
                                    >
                                        {rating > 0 ? rating : 'NR'}
                                    </Text>
                                </HStack>
                                {date && (
                                    <>
                                        <Divider
                                            width="10px"
                                            borderColor={cardAccentColor}
                                        />
                                        <Text
                                            fontSize={{
                                                base: '0.8rem',
                                                lg: '1rem'
                                            }}
                                            color={cardAccentColor}
                                        >
                                            {date}
                                        </Text>
                                    </>
                                )}
                            </HStack>
                        </Box>
                        <Text
                            fontSize={{ base: '0.8rem', lg: '1rem' }}
                            as="main"
                            noOfLines={3}
                        >
                            {overview}
                        </Text>
                    </VStack>
                </Flex>
            </Link>
        </NextLink>
    );
};

export default ShowCard;
