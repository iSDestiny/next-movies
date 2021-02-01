import {
    Button,
    ButtonGroup,
    Flex as Box,
    Flex,
    Heading,
    HStack,
    VStack
} from '@chakra-ui/react';
import { useState } from 'react';
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

    return (
        <VStack mb="1rem" mt="2rem" spacing="1rem" align="flex-start">
            <HStack spacing="1.5rem">
                <Heading size="lg" as="h1" alignSelf="flex-start">
                    {heading}
                </Heading>
                <ButtonGroup size="md" isAttached>
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
            />
        </VStack>
    );
}

export default HomeSection;
