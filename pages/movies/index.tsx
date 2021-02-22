import { Box, Stack } from '@chakra-ui/react';
import CardGrid from 'components/CardGrid';
import Options from 'components/Options';
import Pagination from 'components/Pagination';
import useDiscover from 'hooks/useDiscover';
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

    const { data, page, setSort, setFilters, setPage, isLoading } = useDiscover(
        'movie'
    );

    useEffect(() => {
        console.log(config);
        console.log(USCerts);
        console.log(genres);
        console.log(languages);
    }, []);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [page]);

    return (
        <GeneralLayout title="Movies">
            <Stack
                align="flex-start"
                p="1.5rem 1rem"
                spacing={{ base: '1.5rem', lg: '1rem', xl: '1.5rem' }}
                direction={{ base: 'column', lg: 'row' }}
                maxWidth="1400px"
                m="auto"
            >
                <Options
                    type="movie"
                    setSort={setSort}
                    setFilters={setFilters}
                    genres={genres}
                    languages={languages}
                    certifications={USCerts}
                />
                <Box width={{ base: '100%', lg: '80%' }}>
                    <CardGrid
                        config={config}
                        items={data?.results}
                        isLoading={isLoading}
                    />
                    <Pagination
                        quantity={data?.total_pages}
                        pageChangeHandler={setPage}
                    />
                </Box>
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
