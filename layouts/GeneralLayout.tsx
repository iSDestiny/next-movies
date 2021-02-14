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
            <Box width="100%" height="65px" bgColor="gray.900" />
            <Box pb="150px">{children}</Box>
            <Footer />
        </>
    );
};

export default GeneralLayout;
