import {
    Text,
    Heading,
    Box,
    VStack,
    Icon,
    useColorMode
} from '@chakra-ui/react';
import {
    ButtonBack,
    ButtonNext,
    CarouselProvider,
    Slider,
    Slide
} from 'pure-react-carousel';
import Image from 'next/image';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

interface CastCarouselProps {
    cast: CastEntity[];
    config: TMDBConfig;
}

const CastCarousel = ({ cast, config }: CastCarouselProps) => {
    const { secure_base_url, profile_sizes } = config.images;
    const { colorMode } = useColorMode();
    const visibleSlides = 6;

    return (
        <Box width="100%">
            <Heading as="h2" size="lg" mb="1rem">
                Cast
            </Heading>
            <Box
                position="relative"
                as={CarouselProvider}
                naturalSlideHeight={250}
                naturalSlideWidth={138}
                step={visibleSlides}
                dragStep={visibleSlides}
                visibleSlides={visibleSlides}
                totalSlides={cast.length}
                infinite
            >
                <Box
                    as={Slider}
                    // border="1px solid #F4F6F8"
                    // p="0.5rem"
                    // bgColor={colorMode === 'light' ? 'gray.200' : 'gray.700'}
                    // boxShadow="0 10px 15px rgba(0,0,0,0.1)"
                    borderRadius="5px"
                >
                    {cast.map(
                        ({ id, character, name, profile_path }, index) => (
                            <Slide key={id} index={index}>
                                <VStack
                                    align="flex-start"
                                    width="140px"
                                    // height="300px"
                                    borderRadius="5px"
                                    // border="2px solid black"
                                    overflow="hidden"
                                >
                                    <Image
                                        src={`${secure_base_url}${profile_sizes[2]}${profile_path}`}
                                        width={138}
                                        height={178}
                                        layout="fixed"
                                    />
                                    <Box>
                                        <Heading size="sm">{name}</Heading>
                                        <Text fontSize="14px">{character}</Text>
                                    </Box>
                                </VStack>
                            </Slide>
                        )
                    )}
                </Box>
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
                        <Icon as={FaAngleLeft} fontSize={['1.5rem', '2rem']} />
                    </ButtonBack>
                </Box>
                <Box
                    p="4px"
                    position="absolute"
                    top="25%"
                    right="1rem"
                    color="white"
                    zIndex="4"
                    display={{ base: 'none', md: 'block' }}
                    bgColor="rgba(0,0,0,0.7)"
                    borderRadius="20%"
                >
                    <ButtonNext>
                        <Icon as={FaAngleRight} fontSize={['1.5rem', '2rem']} />
                    </ButtonNext>
                </Box>
            </Box>
        </Box>
    );
};

export default CastCarousel;
