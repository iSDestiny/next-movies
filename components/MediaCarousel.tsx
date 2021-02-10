import { Link } from '@chakra-ui/react';
import Image from 'next/image';
import NextLink from 'next/link';
import { Slide } from 'pure-react-carousel';
import Carousel from './Carousel';
import MotionBox from './MotionBox';

interface MediaCarouselProps {
    naturalHeight: number;
    naturalWidth: number;
    noOfSlides: number;
    buttonSize: string | string[];
    items: Media[];
    name: string;
}

function MediaCarousel({
    naturalHeight,
    naturalWidth,
    noOfSlides,
    buttonSize,
    items,
    name
}: MediaCarouselProps) {
    return (
        <Carousel
            buttonSize={buttonSize}
            noOfSlides={noOfSlides}
            naturalHeight={naturalHeight}
            naturalWidth={naturalWidth}
            totalSlides={items.length}
            buttonXPos="1rem"
            buttonYPos="40%"
        >
            {items.map(({ path, original }, index) => (
                <Slide key={`${path}-${index}`} index={index}>
                    <MotionBox animate={{ opacity: 1 }} opacity={0}>
                        <NextLink href={original} passHref>
                            <Link target="_blank">
                                <Image
                                    alt={`${name}-${index}`}
                                    src={path}
                                    width={naturalWidth}
                                    height={naturalHeight}
                                />
                            </Link>
                        </NextLink>
                    </MotionBox>
                </Slide>
            ))}
        </Carousel>
    );
}

export default MediaCarousel;
