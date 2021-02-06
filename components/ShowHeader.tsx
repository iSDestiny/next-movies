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
    WrapItem
} from '@chakra-ui/react';
import Image from 'next/image';
import { useState } from 'react';
import { FaPlay, FaRegStar, FaStar } from 'react-icons/fa';
import DotDivider from './DotDivider';
import VideoModal from './VideoModal';

interface ShowHeaderProps {
    config: TMDBConfig;
    title: string;
    release_date: string;
    certification: string;
    runtime: number;
    overview: string;
    videos: VideoResultsEntity[];
    genres: GenresEntityOrKeywordsEntity[];
    poster_path: string;
    backdrop_path: string;
    vote_average: number;
    vote_count: number;
    tagline: string;
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
    const [isTrailerOpen, setIsTrailerOpen] = useState(false);
    return (
        <Box as="header" width="100%" position="relative">
            <Image
                alt={`${title} backdrop`}
                src={`${secure_base_url}${backdrop_sizes[3]}${backdrop_path}`}
                layout="fill"
                objectFit="cover"
                objectPosition="200px 0%"
                priority
            />
            <Box
                position="absolute"
                zIndex="0"
                width="100%"
                height="100%"
                bgGradient="linear(to-r, rgba(0,0,0,1) 200px, rgba(0,0,0,0.84))"
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
                <Box borderRadius="10px">
                    <Image
                        className="border-round"
                        src={`${secure_base_url}${poster_sizes[3]}${poster_path}`}
                        alt={`${title} poster`}
                        width={300}
                        height={450}
                        layout="fixed"
                        priority
                    />
                </Box>
                <VStack
                    zIndex="2"
                    justify="flex-start"
                    align="flex-start"
                    py="2.5rem"
                    spacing="0.5rem"
                >
                    <Box color="white">
                        <Heading as="h1" color="white" size="lg" mb="3px">
                            {`${title} `}
                            <Text
                                as="span"
                                fontWeight="400"
                                color="gray.300"
                            >{`(${release_date.slice(0, 4)})`}</Text>
                        </Heading>
                        <HStack spacing="0.5rem">
                            <Text border="1px solid white" px="4px">
                                {certification}
                            </Text>
                            <Text>{release_date}</Text>
                            <DotDivider size="5px" color="white" />
                            <Wrap spacing="0.3rem">
                                {genres.map(({ id, name }, index) => (
                                    <WrapItem key={id}>
                                        <Tag size="sm">{name}</Tag>
                                    </WrapItem>
                                ))}
                            </Wrap>
                            <DotDivider size="5px" color="white" />
                            <Text>
                                {runtime > 60
                                    ? `${Math.floor(runtime / 60)}H ${
                                          runtime -
                                          Math.floor(runtime / 60) * 60
                                      }M`
                                    : `${runtime}M`}
                            </Text>
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
                                    videos.length > 0 ? 'inline-flex' : 'none'
                                }
                            >
                                Play Trailer
                            </Button>
                        </DarkMode>
                    </HStack>
                    <Text fontWeight="300" fontStyle="italic" color="gray.300">
                        {tagline}
                    </Text>
                    <VStack spacing="0.5rem" align="flex-start">
                        <Heading size="md">Overview</Heading>
                        <Text>{overview}</Text>
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
    );
};

export default ShowHeader;
