const title = `Home`;
const titleTemplate = '%s | Next Movies';
const description =
    'Browse popular and trending movies and tv shows. Data belongs to The Movie Database (TMDb). Made with Next.js, Chakra UI and hosted on Vercel';

const SEO = {
    title,
    titleTemplate,
    description,
    canonical: '',
    openGraph: {
        type: 'website',
        locale: 'en_IE',
        url: 'https://next-movies-isdestiny.vercel.app',
        title,
        description,
        images: [
            {
                url:
                    'https://next-movies-isdestiny.vercel.app/images/banner.png',
                alt: title,
                width: 1250,
                height: 650
            }
        ]
    }
};

export default SEO;
