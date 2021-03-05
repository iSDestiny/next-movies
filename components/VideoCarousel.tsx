import { Box, Icon } from '@chakra-ui/react';
import Image from 'next/image';
import { Slide } from 'pure-react-carousel';
import { useState } from 'react';
import { FaPlay } from 'react-icons/fa';
import Carousel from './Carousel';
import MotionBox from './MotionBox';
import dynamic from 'next/dynamic';
const VideoModal = dynamic(import('./VideoModal'));

interface VideoCarouselProps {
    naturalHeight: number;
    naturalWidth: number;
    noOfSlides: number;
    buttonSize: string | string[];
    videos: VideoResultsEntity[];
}

const VideoCarousel = ({
    naturalHeight,
    naturalWidth,
    noOfSlides,
    buttonSize,
    videos
}: VideoCarouselProps) => {
    const [isHoverModes, setIsHoverModes] = useState<boolean[]>(
        [...Array(videos.length).keys()].map(() => false)
    );
    const [videoModes, setVideoModes] = useState<boolean[]>(
        [...Array(videos.length).keys()].map(() => false)
    );

    const setVideoMode = (index: number, status: boolean) => {
        setVideoModes((prev) => {
            const newModes = [...prev];
            newModes[index] = status;
            return newModes;
        });
    };

    const setIsHoverMode = (index: number, status: boolean) => {
        setIsHoverModes((prev) => {
            const newModes = [...prev];
            newModes[index] = status;
            return newModes;
        });
    };

    const hoverVariants = {
        mouseIn: {
            scale: 1.3
        },
        mouseOut: {
            scale: 1
        }
    };

    return (
        <Carousel
            buttonSize={buttonSize}
            noOfSlides={noOfSlides}
            naturalHeight={naturalHeight}
            naturalWidth={naturalWidth}
            totalSlides={videos.length}
            buttonXPos="1rem"
            buttonYPos="40%"
            name="Video Carousel"
        >
            {videos.map(({ id, key, site, name }, index) => (
                <Box key={id} as="li">
                    <Box
                        as={Slide}
                        index={index}
                        position="relative"
                        cursor="pointer"
                        onMouseEnter={() => setIsHoverMode(index, true)}
                        onMouseLeave={() => setIsHoverMode(index, false)}
                    >
                        <MotionBox
                            animate={{ opacity: 1 }}
                            opacity={0}
                            onClick={() => setVideoMode(index, true)}
                        >
                            <Image
                                alt={name}
                                src={`https://img.youtube.com/vi/${key}/0.jpg`}
                                width={naturalWidth}
                                height={naturalHeight}
                                objectFit="cover"
                            />
                        </MotionBox>

                        <MotionBox
                            whileHover={{
                                scale: 1.3
                            }}
                            animate={
                                isHoverModes[index] ? 'mouseIn' : 'mouseOut'
                            }
                            variants={hoverVariants}
                            onClick={() => setVideoMode(index, true)}
                            position="absolute"
                            top="44%"
                            left="47%"
                            zIndex="20"
                        >
                            <Icon as={FaPlay} fontSize="2rem" color="white" />
                        </MotionBox>
                    </Box>
                    {videoModes[index] && (
                        <VideoModal
                            url={`https://youtu.be/${key}`}
                            name={name}
                            isOpen={videoModes[index]}
                            onClose={() => setVideoMode(index, false)}
                        />
                    )}
                </Box>
            ))}
        </Carousel>
    );
};

export default VideoCarousel;
