import { Box, Icon } from '@chakra-ui/react';
import {
    ButtonBack,
    ButtonNext,
    CarouselProvider,
    Slider
} from 'pure-react-carousel';
import { FunctionComponent } from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

interface CarouselProps {
    buttonSize: string | string[];
    noOfSlides: number;
    naturalWidth: number;
    naturalHeight: number;
    totalSlides: number;
    buttonYPos: string | string[];
    buttonXPos: string | string[];
}

const Carousel: FunctionComponent<CarouselProps> = ({
    children,
    buttonSize,
    noOfSlides,
    naturalWidth,
    naturalHeight,
    totalSlides,
    buttonYPos,
    buttonXPos
}) => {
    return (
        <Box width="100%">
            <Box
                as={CarouselProvider}
                naturalSlideHeight={naturalHeight}
                naturalSlideWidth={naturalWidth}
                totalSlides={totalSlides}
                step={noOfSlides}
                dragStep={noOfSlides}
                visibleSlides={noOfSlides}
                infinite
            >
                <Box position="relative">
                    <Slider>{children}</Slider>
                    {noOfSlides <= totalSlides && (
                        <>
                            <Box
                                p="4px"
                                position="absolute"
                                top={buttonYPos}
                                left={buttonXPos}
                                color="white"
                                zIndex="4"
                                display={{ base: 'none', md: 'block' }}
                                bgColor="rgba(0,0,0,0.7)"
                                borderRadius="20%"
                            >
                                <ButtonBack>
                                    <Icon
                                        as={FaAngleLeft}
                                        fontSize={buttonSize}
                                    />
                                </ButtonBack>
                            </Box>
                            <Box
                                p="4px"
                                position="absolute"
                                top={buttonYPos}
                                right={buttonXPos}
                                color="white"
                                zIndex="4"
                                display={{ base: 'none', md: 'block' }}
                                bgColor="rgba(0,0,0,0.7)"
                                borderRadius="20%"
                            >
                                <ButtonNext>
                                    <Icon
                                        as={FaAngleRight}
                                        fontSize={buttonSize}
                                    />
                                </ButtonNext>
                            </Box>
                        </>
                    )}
                </Box>
            </Box>
        </Box>
    );
};

export default Carousel;
