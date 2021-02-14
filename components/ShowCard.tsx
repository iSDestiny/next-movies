import {
    Box,
    Flex,
    Heading,
    Text,
    useColorMode,
    useToken,
    VStack,
    Link,
    useBreakpointValue
} from '@chakra-ui/react';
import NextLink from 'next/link';
import Image from 'next/image';

interface ShowCardProps {
    config: TMDBConfig;
    posterPath: string;
    title: string;
    date: string;
    overview: string;
    href: string;
}

const ShowCard = ({
    config,
    posterPath,
    title,
    date,
    overview,
    href
}: ShowCardProps) => {
    const { colorMode } = useColorMode();
    const { secure_base_url, poster_sizes } = config.images;
    const size = useBreakpointValue({ base: 'xs', lg: 'sm' });
    const [gray300, gray700] = useToken('colors', ['gray.300', 'gray.700']);
    const cardAccentColor = colorMode === 'light' ? 'gray.600' : 'gray.400';
    const cardBorderColor = colorMode === 'light' ? gray300 : gray700;
    const posterSrc = posterPath
        ? `${secure_base_url}${poster_sizes[1]}${posterPath}`
        : '/images/default-placeholder-image.png';

    return (
        <NextLink href={href} passHref>
            <Link _hover={{ textDecor: 'none' }}>
                <Flex
                    border={`1px solid ${cardBorderColor}`}
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
                        width="70%"
                        spacing="1rem"
                        align="flex-start"
                        p={{ base: '0.5rem', lg: '1rem' }}
                    >
                        <Box as="header">
                            <Heading as="h3" size={size} noOfLines={2}>
                                {title}
                            </Heading>
                            <Text
                                fontSize={{ base: '0.8rem', lg: '1rem' }}
                                color={cardAccentColor}
                            >
                                {date}
                            </Text>
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
