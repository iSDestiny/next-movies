import useDiscover from 'hooks/useDiscover';
import GeneralLayout from 'layouts/GeneralLayout';
import SpecficFilterLayout from 'layouts/SpecficFilterLayout';
import { GetStaticPaths, GetStaticProps } from 'next';
import { ungzip } from 'node-gzip';
import React, { useEffect } from 'react';
import addLeadingZeroToDate from 'utils/addLeadingZeroToDate';
import tmdbFetch from 'utils/tmdbFetch';
import tmdbFetchGzip from 'utils/tmdbFetchGzip';

interface KeywordProps {
    keyword: GenresEntityOrKeywordsEntity;
    movies: PopularMovies;
    tvShows: PopularTVShows;
    config: TMDBConfig;
}

const Keyword = ({ keyword, movies, tvShows, config }: KeywordProps) => {
    const movieCategory = useDiscover(
        'movie',
        movies as PopularMoviesAndPopularTVShows,
        {
            includeKeywords: keyword.id + ''
        }
    );
    const tvShowCategory = useDiscover(
        'tv',
        tvShows as PopularMoviesAndPopularTVShows,
        {
            includeKeywords: keyword.id + ''
        }
    );

    const categories = [movieCategory, tvShowCategory];

    useEffect(() => {
        console.log(keyword);
        console.log(categories);
    }, []);

    return (
        <GeneralLayout title={`Keyword: "${keyword.name}"`}>
            <SpecficFilterLayout
                config={config}
                heading={keyword.name}
                categories={categories}
            />
        </GeneralLayout>
    );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const { id } = params;
    let movies: PopularMovies;
    let tvShows: PopularTVShows;
    let config: TMDBConfig;
    let keyword: GenresEntityOrKeywordsEntity;

    try {
        const { data: configData } = await tmdbFetch.get('/configuration');
        const { data: tvData } = await tmdbFetch.get('/discover/tv', {
            params: {
                with_keywords: id
            }
        });
        const { data: movieData } = await tmdbFetch.get('/discover/movie', {
            params: {
                with_keywords: id
            }
        });
        const {
            data: keywordData
        }: { data: GenresEntityOrKeywordsEntity } = await tmdbFetch.get(
            `/keyword/${id}`
        );

        config = configData;
        movies = movieData;
        tvShows = tvData;
        keyword = keywordData;

        return {
            props: {
                keyword,
                movies,
                tvShows,
                config
            },
            revalidate: 3600
        };
    } catch (err) {
        return {
            notFound: true
        };
    }
};

export const getStaticPaths: GetStaticPaths = async () => {
    let ids: number[];
    const date = new Date();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    const res = await tmdbFetchGzip.get(
        `/keyword_ids_${addLeadingZeroToDate(month)}_${addLeadingZeroToDate(
            day
        )}_${year}.json.gz`,
        {
            responseType: 'arraybuffer',
            headers: {
                'Accept-Encoding': 'gzip'
            }
        }
    );

    const uncompressed = await ungzip(res.data);
    ids = uncompressed
        .toString()
        .trim()
        .split('\n')
        .map((line) => {
            const json = JSON.parse(line);
            return json.id;
        });

    const paths = ids.map((id) => {
        if (id) return { params: { id: id + '' } };
        console.log('error' + id);
        return { params: { id: null } };
    });

    return {
        paths,
        fallback: true
    };
};

export default Keyword;
