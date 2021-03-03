import { Box, Heading, useBreakpointValue } from '@chakra-ui/react';
import { FunctionComponent } from 'react';

interface SectionProps {
    heading: string;
    spacing: string;
}

const Section: FunctionComponent<SectionProps> = ({
    heading,
    children,
    spacing
}) => {
    const headingSize = useBreakpointValue({ base: 'sm', md: 'md', xl: 'lg' });
    return (
        <Box as="section" width="100%">
            <Heading size={headingSize} mb={spacing}>
                {heading}
            </Heading>
            {children}
        </Box>
    );
};

export default Section;
