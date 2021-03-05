import {
    Box,
    Text,
    Heading,
    HStack,
    VStack,
    Icon,
    Flex,
    DarkMode,
    Button,
    Tag,
    Wrap,
    WrapItem,
    useColorMode,
    useBreakpointValue,
    Link
} from '@chakra-ui/react';
import NextLink from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { FaPlay, FaRegStar, FaStar } from 'react-icons/fa';
import DotDivider from './DotDivider';
import replaceSpacesWithDashes from 'utils/replaceSpacesWithDashes';
import dynamic from 'next/dynamic';
const VideoModal = dynamic(import('./VideoModal'));

interface ShowHeaderProps {
    config: TMDBConfig;
    title: string;
    release_date: string;
    certification: string;
    overview: string;
    videos: VideoResultsEntity[];
    genres: GenresEntityOrKeywordsEntity[];
    poster_path: string;
    backdrop_path: string;
    vote_average: number;
    vote_count: number;
    tagline: string;
    runtime?: number;
}

const ShowHeader = ({
    config,
    tagline,
    vote_average,
    vote_count,
    title,
    release_date,
    certification,
    runtime,
    overview,
    videos,
    genres,
    backdrop_path,
    poster_path
}: ShowHeaderProps) => {
    const { secure_base_url, backdrop_sizes, poster_sizes } = config.images;
    const posterWidth = useBreakpointValue([
        '100px',
        '150px',
        '250px',
        '300px'
    ]);
    const posterHeight = useBreakpointValue([
        '150px',
        '225px',
        '375px',
        '450px'
    ]);
    const bgOpacity = useBreakpointValue({ base: '0', md: '0.84' });
    const [isTrailerOpen, setIsTrailerOpen] = useState(false);
    const { colorMode } = useColorMode();
    return (
        <Box as="header" width="100%">
            <Box position="relative" bgColor="black">
                {backdrop_path && (
                    <Image
                        alt={`${title} backdrop`}
                        src={`${secure_base_url}${backdrop_sizes[3]}${backdrop_path}`}
                        layout="fill"
                        objectFit="cover"
                        objectPosition={`${posterWidth} 0`}
                    />
                )}
                <Box
                    position="absolute"
                    zIndex="0"
                    width="100%"
                    height="100%"
                    bgGradient={`linear(to-r, rgba(0,0,0,1) ${posterWidth}, rgba(0,0,0,${bgOpacity}))`}
                />
                <HStack
                    p="2rem 1rem"
                    zIndex="2"
                    maxWidth="1400px"
                    margin="auto"
                    padding="1.5rem 2rem"
                    position="relative"
                    justify="flex-start"
                    align="center"
                    spacing="2rem"
                    color="white"
                >
                    <Box
                        borderRadius="10px"
                        minWidth={posterWidth}
                        height={posterHeight}
                        bgColor="white"
                        position="relative"
                    >
                        <Image
                            className="border-round"
                            src={
                                poster_path
                                    ? `${secure_base_url}${poster_sizes[3]}${poster_path}`
                                    : '/images/default-placeholder-image.png'
                            }
                            alt={`${title} poster`}
                            layout="fill"
                            objectFit="cover"
                        />
                    </Box>
                    <VStack
                        zIndex="2"
                        justify="flex-start"
                        align="flex-start"
                        py="2.5rem"
                        spacing="0.5rem"
                        display={{ base: 'none', md: 'flex' }}
                    >
                        <Box color="white">
                            <Heading as="h1" color="white" size="md" mb="3px">
                                {`${title} `}
                                {release_date && (
                                    <Text
                                        as="span"
                                        fontWeight="400"
                                        color="gray.300"
                                    >{`(${release_date.slice(0, 4)})`}</Text>
                                )}
                            </Heading>
                            <HStack spacing="0.5rem" align="center">
                                {certification && release_date && (
                                    <>
                                        <Text
                                            border="1px solid white"
                                            px="4px"
                                            flexShrink={0}
                                        >
                                            {certification}
                                        </Text>
                                        <Text>{release_date}</Text>
                                        <DotDivider size="5px" color="white" />
                                    </>
                                )}
                                <Wrap spacing="0.3rem">
                                    {genres.map(({ id, name }, index) => (
                                        <WrapItem key={id}>
                                            <NextLink
                                                href={`/genre/${id}-${replaceSpacesWithDashes(
                                                    name
                                                )}`}
                                                passHref
                                            >
                                                <Link>
                                                    <Tag size="sm">{name}</Tag>
                                                </Link>
                                            </NextLink>
                                        </WrapItem>
                                    ))}
                                </Wrap>
                                {runtime && (
                                    <>
                                        <DotDivider size="5px" color="white" />
                                        <Text>
                                            {runtime > 60
                                                ? `${Math.floor(
                                                      runtime / 60
                                                  )}H ${
                                                      runtime -
                                                      Math.floor(runtime / 60) *
                                                          60
                                                  }M`
                                                : `${runtime}M`}
                                        </Text>
                                    </>
                                )}
                            </HStack>
                        </Box>
                        <HStack spacing="1rem" align="center">
                            <Flex align="center">
                                <Icon
                                    as={vote_count > 0 ? FaStar : FaRegStar}
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
                                    {vote_count > 0 ? vote_average : 'NR'}
                                </Text>
                            </Flex>
                            <DarkMode>
                                <Button
                                    onClick={() => setIsTrailerOpen(true)}
                                    variant="ghost"
                                    leftIcon={<FaPlay />}
                                    display={
                                        videos.length > 0
                                            ? 'inline-flex'
                                            : 'none'
                                    }
                                >
                                    Play Trailer
                                </Button>
                            </DarkMode>
                        </HStack>
                        <Text
                            fontWeight="300"
                            fontStyle="italic"
                            color="gray.300"
                        >
                            {tagline}
                        </Text>
                        <VStack spacing="0.5rem" align="flex-start">
                            <Heading size="md">Overview</Heading>
                            <Text
                                fontSize={[
                                    '0.75rem',
                                    '0.78rem',
                                    '0.95rem',
                                    '1rem',
                                    '1.1rem'
                                ]}
                            >
                                {overview}
                            </Text>
                        </VStack>
                    </VStack>
                </HStack>
                <VideoModal
                    url={`https://youtu.be/${videos[0]?.key}`}
                    name={videos[0]?.name}
                    isOpen={isTrailerOpen}
                    onClose={() => setIsTrailerOpen(false)}
                />
            </Box>
            <VStack
                bgColor={colorMode === 'light' ? 'gray.800' : 'gray.700'}
                width="100%"
                display={{ base: 'flex', md: 'none' }}
                color="white"
                p="1rem"
            >
                <Box>
                    <Heading as="h1" size="sm" mb="3px" textAlign="center">
                        {`${title} `}
                        <Text
                            as="span"
                            fontWeight="400"
                            color="gray.300"
                        >{`(${release_date.slice(0, 4)})`}</Text>
                    </Heading>
                </Box>
                <HStack spacing="1rem" align="center">
                    <Flex align="center">
                        <Icon
                            as={vote_count > 0 ? FaStar : FaRegStar}
                            fontSize={['1.2rem', '1.4rem', '1.5rem']}
                            color="yellow.400"
                            mr="5px"
                        />
                        <Text fontSize={['0.95rem', '1rem', '1.1rem']}>
                            {vote_count > 0 ? vote_average : 'NR'}
                        </Text>
                    </Flex>
                    <DarkMode>
                        <Button
                            onClick={() => setIsTrailerOpen(true)}
                            variant="ghost"
                            leftIcon={<FaPlay />}
                            display={videos.length > 0 ? 'inline-flex' : 'none'}
                        >
                            Play Trailer
                        </Button>
                    </DarkMode>
                </HStack>
                <HStack spacing="0.5rem" align="center">
                    <Text border="1px solid white" px="4px" flexShrink={0}>
                        {certification}
                    </Text>
                    <Text>{release_date}</Text>
                    {runtime && (
                        <>
                            <DotDivider size="5px" color="white" />
                            <Text>
                                {runtime > 60
                                    ? `${Math.floor(runtime / 60)}H ${
                                          runtime -
                                          Math.floor(runtime / 60) * 60
                                      }M`
                                    : `${runtime}M`}
                            </Text>
                        </>
                    )}
                </HStack>
                <Wrap spacing="0.3rem" justify="center">
                    {genres.map(({ id, name }) => (
                        <WrapItem key={id}>
                            <NextLink
                                href={`/genre/${id}-${replaceSpacesWithDashes(
                                    name
                                )}`}
                                passHref
                            >
                                <Link>
                                    <Tag
                                        size="sm"
                                        bgColor="white"
                                        color="black"
                                    >
                                        {name}
                                    </Tag>
                                </Link>
                            </NextLink>
                        </WrapItem>
                    ))}
                </Wrap>
                <Text fontWeight="300" fontStyle="italic" color="gray.300">
                    {tagline}
                </Text>
                <VStack spacing="0.5rem" align="flex-start">
                    <Heading size="md">Overview</Heading>
                    <Text
                        fontSize={[
                            '0.75rem',
                            '0.78rem',
                            '0.95rem',
                            '1rem',
                            '1.1rem'
                        ]}
                    >
                        {overview}
                    </Text>
                </VStack>
            </VStack>
        </Box>
    );
};

export default ShowHeader;
