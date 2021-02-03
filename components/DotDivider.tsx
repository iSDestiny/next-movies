import { Box } from '@chakra-ui/react';
interface DotDividerProps {
    size: number | string;
    color: string;
}

const DotDivider = ({ size, color }) => {
    return (
        <Box height={size} borderRadius="50%" bgColor={color} width={size} />
    );
};

export default DotDivider;
