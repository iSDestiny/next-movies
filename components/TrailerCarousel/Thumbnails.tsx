import { Box, Stack } from '@chakra-ui/react';
import Image from 'next/image';
import { Dot } from 'pure-react-carousel';
import classes from './Thumbnails.module.scss';
import dynamic from 'next/dynamic';
import { CarouselContext } from 'pure-react-carousel';
import { useContext, useEffect, useState } from 'react';

const ScrollIntoViewIfNeeded = dynamic(
    () => import('react-scroll-into-view-if-needed'),
    { ssr: false }
);

interface ThumbnailsProps {
    config: TMDBConfig;
    trendingResults: TrendingResultsEntity[];
    height: number;
}

const Thumbnails = ({ config, trendingResults, height }: ThumbnailsProps) => {
    const { secure_base_url, poster_sizes } = config.images;
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
            {trendingResults.map(({ poster_path, id, name, title }, index) => (
                <Box position="relative" key={id}>
                    <ScrollIntoViewIfNeeded active={index === currentSlide}>
                        <Box
                            as={Dot}
                            slide={index}
                            p="5px"
                            flexShrink={0}
                            height="137px"
                        >
                            <Image
                                src={
                                    poster_path
                                        ? `${secure_base_url}${poster_sizes[0]}${poster_path}`
                                        : '/images/default-placeholder-image.png'
                                }
                                alt={`${name || title} thumbnail`}
                                width={92}
                                height={138}
                            />
                        </Box>
                        <Box
                            display={index === currentSlide ? 'block' : 'none'}
                            zIndex="1"
                            position="absolute"
                            bgColor="rgba(255,255,255,0.5)"
                            top="0"
                            width="100%"
                            height="100%"
                        />
                    </ScrollIntoViewIfNeeded>
                </Box>
            ))}
        </Stack>
    );
};

export default Thumbnails;
