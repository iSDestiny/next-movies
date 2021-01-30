import { Box, Stack } from '@chakra-ui/react';
import Image from 'next/image';
import { Dot } from 'pure-react-carousel';
import classes from './Thumbnails.module.scss';
import { CarouselContext } from 'pure-react-carousel';
import { useContext, useEffect, useState } from 'react';

interface ThumbnailsProps {
    config: TMDBConfig;
    trendingResults: TrendingResultsEntity[];
    height: number;
}

const Thumbnails = ({ config, trendingResults, height }: ThumbnailsProps) => {
    const { base_url, poster_sizes } = config.images;
    const carouselContext = useContext(CarouselContext);
    const [currentSlide, setCurrentSlide] = useState(
        carouselContext.state.currentSlide
    );

    useEffect(() => {
        function onChange() {
            setCurrentSlide(carouselContext.state.currentSlide);
        }
        carouselContext.subscribe(onChange);
        return () => carouselContext.unsubscribe(onChange);
    }, [carouselContext]);

    return (
        <Stack
            css={{
                '&::-webkit-scrollbar': {
                    display: 'none'
                }
            }}
            spacing="5px"
            display={{ base: 'none', lg: 'flex' }}
            direction="column"
            height={{ base: '100%', lg: height }}
            overflow="scroll"
            width={{ base: '100%', lg: 'auto' }}
        >
            {trendingResults.map(({ poster_path, id }, index) => (
                <Box position="relative">
                    <Box
                        key={id}
                        as={Dot}
                        slide={index}
                        p="5px"
                        flexShrink={0}
                        height="137px"
                    >
                        <Image
                            src={`${base_url}${poster_sizes[0]}${poster_path}`}
                            width={92}
                            height={137}
                        />
                    </Box>
                    <Box
                        display={index === currentSlide ? 'block' : 'none'}
                        zIndex="1"
                        position="absolute"
                        bgColor="rgba(255,255,255,0.4)"
                        top="0"
                        width="100%"
                        height="100%"
                    />
                </Box>
            ))}
        </Stack>
    );
};

export default Thumbnails;
