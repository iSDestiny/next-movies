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
            {children}
            <Footer />
        </>
    );
};

export default GeneralLayout;
