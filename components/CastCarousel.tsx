import {
    Box,
    Heading,
    Link,
    Text,
    useBreakpointValue,
    VStack
} from '@chakra-ui/react';
import Image from 'next/image';
import { Slide } from 'pure-react-carousel';
import Carousel from './Carousel';
import NextLink from 'next/link';

interface CastCarouselProps {
    cast: CastEntity[];
    config: TMDBConfig;
    headingSize: string;
    buttonSize: string | string[];
    type: string;
}

const CastCarousel = ({
    cast,
    config,
    headingSize,
    buttonSize,
    type
}: CastCarouselProps) => {
    const { secure_base_url, profile_sizes } = config.images;
    const naturalHeight = useBreakpointValue([245, 250]);
    const visibleSlides = useBreakpointValue([3, 4, 5, 5, 6]);
    const nameSize = useBreakpointValue([
        '0.7rem',
        '0.75rem',
        '0.85rem',
        '0.85rem',
        '1rem'
    ]);
    const characterSize = useBreakpointValue([
        '0.65rem',
        '0.7rem',
        '0.8rem',
        '0.8rem',
        '0.95rem'
    ]);

    return (
        <Box width="100%" mb="1rem">
            <Heading as="h2" size={headingSize} mb="1rem">
                {`Cast (${cast.length})`}
            </Heading>
            {cast.length > 0 ? (
                <Carousel
                    buttonSize={buttonSize}
                    noOfSlides={visibleSlides}
                    naturalWidth={138}
                    naturalHeight={naturalHeight}
                    totalSlides={cast.length}
                    buttonYPos="25%"
                    buttonXPos="1rem"
                    name="Cast"
                >
                    {cast.map(
                        ({ id, character, name, profile_path }, index) => (
                            <Slide key={`${id}-${name}-${index}`} index={index}>
                                <NextLink href={`/person/${id}`} passHref>
                                    <Link>
                                        <VStack
                                            align="flex-start"
                                            overflow="hidden"
                                        >
                                            <Image
                                                src={
                                                    profile_path
                                                        ? `${secure_base_url}${profile_sizes[2]}${profile_path}`
                                                        : '/images/profile-placeholder.png'
                                                }
                                                alt={`${name} profile`}
                                                width={138}
                                                height={178}
                                            />
                                            <Box>
                                                <Heading
                                                    as="p"
                                                    fontSize={nameSize}
                                                >
                                                    {name}
                                                </Heading>
                                                <Text fontSize={characterSize}>
                                                    {character}
                                                </Text>
                                            </Box>
                                        </VStack>
                                    </Link>
                                </NextLink>
                            </Slide>
                        )
                    )}
                </Carousel>
            ) : (
                <Box>
                    <Text size="md" mb="1rem">
                        We dont have any cast added to this {type}.
                    </Text>
                </Box>
            )}
        </Box>
    );
};

export default CastCarousel;
