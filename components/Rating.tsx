import { Box, Icon, Tooltip } from '@chakra-ui/react';
import { FaStar } from 'react-icons/fa';
interface RatingProps {
    rating: number;
    size: string | number;
}

const Rating = ({ rating, size }: RatingProps) => {
    const withinFiveStars = rating / 2;
    const ceiledRating = Math.ceil(withinFiveStars);

    return (
        <Tooltip label={rating} hasArrow>
            <Box position="relative">
                {[...Array(ceiledRating).keys()].map(() => {
                    return (
                        <Icon as={FaStar} fontSize={size} color="yellow.400" />
                    );
                })}
            </Box>
        </Tooltip>
    );
};

export default Rating;
