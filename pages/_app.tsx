import { ChakraProvider } from '@chakra-ui/react';
import { AnimatePresence } from 'framer-motion';
import { DefaultSeo } from 'next-seo';
import SEO from 'next-seo.config';
import { AppProps } from 'next/dist/next-server/lib/router/router';
import Head from 'next/head';
import 'pure-react-carousel/dist/react-carousel.es.css';
import { useEffect } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import 'styles/datePicker.scss';
import 'styles/globals.scss';
import 'styles/reactSlider.scss';
import theme from 'theme';
import * as gtag from 'utils/gtag';

function MyApp({ Component, pageProps, router }: AppProps) {
    useEffect(() => {
        if (process.env.NODE_ENV === 'production') {
            const handleRouteChange = (url: URL) => {
                gtag.pageview(url);
            };
            router.events.on('routeChangeComplete', handleRouteChange);
            return () => {
                router.events.off('routeChangeComplete', handleRouteChange);
            };
        }
    }, [router.events]);

    return (
        <>
            <Head>
                <meta
                    content="width=device-width, initial-scale=1"
                    name="viewport"
                />
            </Head>
            <DefaultSeo {...SEO} />
            <ChakraProvider theme={theme}>
                <AnimatePresence exitBeforeEnter>
                    <Component {...pageProps} key={router.asPath} />
                </AnimatePresence>
            </ChakraProvider>
        </>
    );
}

export default MyApp;
