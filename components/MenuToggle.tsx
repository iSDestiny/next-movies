import { IconButton, useColorMode } from '@chakra-ui/react';
import { motion, SVGMotionProps } from 'framer-motion';

interface PathProps extends SVGMotionProps<SVGPathElement> {
    stroke: string;
}

const Path = (props: PathProps) => (
    <motion.path
        fill="transparent"
        strokeWidth="3"
        stroke={props.stroke}
        strokeLinecap="round"
        {...props}
    />
);

const MenuToggle = ({ toggle }) => {
    const { colorMode } = useColorMode();

    return (
        <IconButton
            onClick={toggle}
            ml="-1rem"
            colorScheme="white"
            aria-label="open navigation menu"
            variant="ghost"
        >
            <svg width="25" height="25" viewBox="0 0 20 20">
                <Path
                    stroke={colorMode === 'light' ? 'black' : 'white'}
                    variants={{
                        closed: { d: 'M 2 2.5 L 20 2.5' },
                        open: { d: 'M 3 17 L 17 3' }
                    }}
                />
                <Path
                    stroke={colorMode === 'light' ? 'black' : 'white'}
                    d="M 2 9.423 L 20 9.423"
                    variants={{
                        closed: { opacity: 1 },
                        open: { opacity: 0 }
                    }}
                    transition={{ duration: 0.1 }}
                />
                <Path
                    stroke={colorMode === 'light' ? 'black' : 'white'}
                    variants={{
                        closed: { d: 'M 2 16.346 L 20 16.346' },
                        open: { d: 'M 3 2.5 L 17 16.346' }
                    }}
                />
            </svg>
        </IconButton>
    );
};

export default MenuToggle;
