import useDiscover, { Filters } from 'hooks/useDiscover';
import GeneralLayout from 'layouts/GeneralLayout';
import SpecficFilterLayout from 'layouts/SpecficFilterLayout';
import { GetStaticPaths, GetStaticProps } from 'next';
import { ungzip } from 'node-gzip';
import React, { useEffect, useState } from 'react';
import addLeadingZeroToDate from 'utils/addLeadingZeroToDate';
import replaceSpacesWithDashes from 'utils/replaceSpacesWithDashes';
import tmdbFetch from 'utils/tmdbFetch';
import tmdbFetchGzip from 'utils/tmdbFetchGzip';

interface GenreProps {
    genre: GenresEntityOrKeywordsEntity;
    movies: PopularMovies;
    tvShows: PopularTVShows;
    config: TMDBConfig;
}

const Genre = ({ genre, movies, tvShows, config }: GenreProps) => {
    const movieCategory = useDiscover(
        'movie',
        movies as PopularMoviesAndPopularTVShows,
        {
            includeGenres: genre.id + ''
        }
    );
    const tvShowCategory = useDiscover(
        'tv',
        tvShows as PopularMoviesAndPopularTVShows,
        {
            includeGenres: genre.id + ''
        }
    );

    const categories = [movieCategory, tvShowCategory];

    return (
        <GeneralLayout title={`Genre: ${genre.name}`}>
            <SpecficFilterLayout
                config={config}
                heading={genre.name}
                categories={categories}
            />
        </GeneralLayout>
    );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const { idAndName } = params;
    const joint = (idAndName as string).split('-');
    const id = joint[0];
    const name = joint.splice(1).reduce((accum, curr) => `${accum} ${curr}`);

    let movies: PopularMovies;
    let tvShows: PopularTVShows;
    let config: TMDBConfig;

    const { data: configData } = await tmdbFetch.get('/configuration');
    const { data: tvData } = await tmdbFetch.get('/discover/tv', {
        params: {
            with_genres: id
        }
    });
    const { data: movieData } = await tmdbFetch.get('/discover/movie', {
        params: {
            with_genres: id
        }
    });

    config = configData;
    movies = movieData;
    tvShows = tvData;

    return {
        props: {
            genre: { id, name },
            movies,
            tvShows,
            config
        }
    };
};

export const getStaticPaths: GetStaticPaths = async () => {
    const {
        data: { genres: movieGenres }
    } = await tmdbFetch.get('/genre/movie/list');
    const {
        data: { genres: tvGenres }
    } = await tmdbFetch.get('/genre/tv/list');

    const genres: GenresEntityOrKeywordsEntity[] = [
        ...new Set([...movieGenres, ...tvGenres])
    ];

    const paths = genres.map(({ name, id }) => ({
        params: { idAndName: `${id}-${replaceSpacesWithDashes(name)}` }
    }));

    return {
        paths,
        fallback: false
    };
};

export default Genre;