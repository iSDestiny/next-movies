import { AppProps } from 'next/dist/next-server/lib/router/router';
import { ChakraProvider } from '@chakra-ui/react';
import { AnimatePresence } from 'framer-motion';
import Head from 'next/head';
import '../styles/globals.scss';
import 'pure-react-carousel/dist/react-carousel.es.css';
import 'react-datepicker/dist/react-datepicker.css';
import 'styles/datePicker.scss';

import theme from 'theme';

function MyApp({ Component, pageProps, router }: AppProps) {
    return (
        <>
            <Head>
                <meta
                    content="width=device-width, initial-scale=1"
                    name="viewport"
                />
            </Head>
            {/* <DefaultSeo {...SEO} /> */}
            <ChakraProvider theme={theme}>
                <AnimatePresence exitBeforeEnter>
                    <Component {...pageProps} key={router.asPath} />
                </AnimatePresence>
            </ChakraProvider>
        </>
    );
}

export default MyApp;
