import { Box } from '@chakra-ui/react';
import Footer from 'components/Footer';
import Navbar from 'components/Navbar';
import { FunctionComponent } from 'react';

interface LayoutProps {
    title: string;
}

const GeneralLayout: FunctionComponent<LayoutProps> = ({ title, children }) => {
    return (
        <>
            <Navbar />
            <Box pt="65px" pb="150px">
                {children}
            </Box>
            <Footer />
        </>
    );
};

export default GeneralLayout;
