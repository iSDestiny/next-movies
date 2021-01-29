import {
    chakra,
    ChakraProps,
    ComponentWithAs,
    forwardRef
} from '@chakra-ui/react';
import { isValidMotionProp, motion, MotionProps } from 'framer-motion';

export type MotionBoxProps = Omit<ChakraProps, keyof MotionProps> &
    MotionProps & {
        as?: React.ElementType;
    };

const MotionBox = motion.custom(
    forwardRef<MotionBoxProps, 'div'>((props, ref) => {
        const chakraProps = Object.fromEntries(
            // do not pass framer props to DOM element
            Object.entries(props).filter(([key]) => !isValidMotionProp(key))
        );
        return <chakra.div ref={ref} {...chakraProps} />;
    })
) as ComponentWithAs<'div', MotionBoxProps>;

export default MotionBox;
