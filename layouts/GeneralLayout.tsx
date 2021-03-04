import { Box } from '@chakra-ui/react';
import Footer from 'components/Footer';
import Navbar from 'components/Navbar';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import { FunctionComponent } from 'react';

interface LayoutProps {
    title: string;
    description?: string;
    imgSrc?: string;
}

const GeneralLayout: FunctionComponent<LayoutProps> = ({
    title,
    description,
    children,
    imgSrc
}) => {
    const router = useRouter();
    const url = `https://next-movies-isdestiny.vercel.app/${router.pathname}`;

    return (
        <>
            <NextSeo
                title={title}
                description={description}
                canonical={url}
                openGraph={{
                    url,
                    title,
                    description,
                    images: [{ url: imgSrc, alt: title }]
                }}
            />
            <Navbar />
            <Box width="100%" height="65px" bgColor="gray.900" />
            <Box pb="150px">{children}</Box>
            <Footer />
        </>
    );
};

export default GeneralLayout;
