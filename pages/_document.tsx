import { ColorModeScript } from '@chakra-ui/react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { GA_TRACKING_ID } from 'utils/gtag';

class MyDocument extends Document {
    render() {
        return (
            <Html lang="en">
                <Head>
                    {process.env.NODE_ENV === 'production' && (
                        <>
                            <script
                                async
                                src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
                            />
                            <script
                                dangerouslySetInnerHTML={{
                                    __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_TRACKING_ID}', {
                page_path: window.location.pathname,
              });
          `
                                }}
                            />
                        </>
                    )}
                    <link
                        rel="apple-touch-icon"
                        sizes="180x180"
                        href="/logos/apple-touch-icon.png"
                    />
                    <link
                        rel="icon"
                        type="image/png"
                        sizes="32x32"
                        href="/logos/favicon-32x32.png"
                    />
                    <link
                        rel="icon"
                        type="image/png"
                        sizes="16x16"
                        href="/logos/favicon-16x16.png"
                    />
                    <link rel="manifest" href="/logos/site.webmanifest" />
                    <link
                        rel="mask-icon"
                        href="/logos/safari-pinned-tab.svg"
                        color="#5bbad5"
                    />
                    <link rel="shortcut icon" href="/logos/favicon.ico" />
                    <meta
                        name="msapplication-config"
                        content="/logos/browserconfig.xml"
                    />
                    <meta content="#4FD1C5" name="theme-color" />
                    <meta content="#4FD1C5" name="msapplication-TileColor" />
                </Head>
                <body>
                    <ColorModeScript />
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
