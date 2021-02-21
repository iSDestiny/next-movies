import { Stack } from '@chakra-ui/react';
import Options from 'components/Options';
import GeneralLayout from 'layouts/GeneralLayout';
import { GetStaticProps } from 'next';
import { useEffect } from 'react';
import tmdbFetch from 'utils/tmdbFetch';

interface MoviesProps {
    config: TMDBConfig;
    certifications: Certifications;
    genres: GenresEntityOrKeywordsEntity[];
    languages: Language[];
}

const Movies = ({ config, certifications, genres, languages }: MoviesProps) => {
    const USCerts = certifications['US'];

    useEffect(() => {
        console.log(config);
        console.log(USCerts);
        console.log(genres);
        console.log(languages);
    }, []);
    return (
        <GeneralLayout title="Movies">
            <Stack
                direction={{ base: 'column', lg: 'row' }}
                maxWidth="1400px"
                m="auto"
            >
                <Options
                    type="movie"
                    genres={genres}
                    languages={languages}
                    certifications={USCerts}
                />
            </Stack>
        </GeneralLayout>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    const { data: config }: { data: TMDBConfig } = await tmdbFetch.get(
        '/configuration'
    );
    const {
        data: { certifications }
    }: { data: { certifications: Certifications } } = await tmdbFetch.get(
        '/certification/movie/list'
    );
    const {
        data: { genres }
    }: {
        data: { genres: GenresEntityOrKeywordsEntity[] };
    } = await tmdbFetch.get('/genre/movie/list');
    const { data: languages }: { data: Language[] } = await tmdbFetch.get(
        '/configuration/languages'
    );

    return {
        props: {
            config,
            certifications,
            genres,
            languages
        }
    };
};

export default Movies;
