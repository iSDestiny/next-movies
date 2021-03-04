import {
    Button,
    ButtonGroup,
    Flex as Box,
    Flex,
    Heading,
    HStack,
    useBreakpointValue,
    VStack
} from '@chakra-ui/react';
import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import MotionBox from './MotionBox';
import ShowCarousel from './ShowCarousel';

interface CarouselProps {
    name: string;
    items: Movie[] | TVShow[];
}

interface HomeSectionProps {
    heading: string;
    carousels: CarouselProps[];
    config: TMDBConfig;
}

function HomeSection({ heading, carousels, config }: HomeSectionProps) {
    const [currentCarousel, setCurrentCarousel] = useState(0);
    const { base_url, poster_sizes } = config.images;
    const headingSize = useBreakpointValue(['sm', 'md', 'lg']);
    const buttonSize = useBreakpointValue({ base: 'xs', sm: 'sm', lg: 'md' });
    const noOfSlides = useBreakpointValue([3, 4, 5, 6, 7]);
    const naturalHeight = useBreakpointValue([2300, 2200, 2200, 2200]);

    return (
        <VStack as="section" mt="2.5rem" spacing="1rem" align="flex-start">
            <HStack
                spacing={{ base: '0.8rem', md: '1rem', lg: '1.5rem' }}
                align="center"
                justify="flex-start"
            >
                <Heading
                    size={headingSize}
                    as="h1"
                    alignSelf="flex-start"
                    my="auto"
                >
                    {heading}
                </Heading>
                <ButtonGroup size={buttonSize} isAttached>
                    {carousels.map(({ name }, index) => (
                        <Button
                            key={name}
                            colorScheme="teal"
                            variant={
                                index === currentCarousel ? 'solid' : 'outline'
                            }
                            onClick={() => setCurrentCarousel(index)}
                        >
                            {name}
                        </Button>
                    ))}
                </ButtonGroup>
            </HStack>
            <ShowCarousel
                name={carousels[currentCarousel].name}
                items={carousels[currentCarousel].items}
                base_url={base_url}
                poster_sizes={poster_sizes}
                noOfSlides={noOfSlides}
                naturalHeight={naturalHeight}
                starSize={['0.8rem', '1rem', '1.2rem', '1.4rem', '1.5rem']}
                ratingSize={['0.75rem', '0.78rem', '0.95rem', '1rem', '1.1rem']}
                headingSize={['0.7rem', '0.78rem', '0.95rem', '1rem', '1.1rem']}
                buttonSize={['1.5rem', '2rem', '2.5rem']}
            />
        </VStack>
    );
}

export default HomeSection;
