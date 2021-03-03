import GeneralLayout from 'layouts/GeneralLayout';
import TrendingLayout from 'layouts/TrendingLayout';
import { GetStaticProps } from 'next';
import { useEffect } from 'react';
import tmdbFetch from 'utils/tmdbFetch';

interface TrendingMoviesProps {
    trendingDaily: Trending;
    trendingWeekly: Trending;
}

const TrendingMovies = ({
    trendingDaily,
    trendingWeekly
}: TrendingMoviesProps) => {
    useEffect(() => {
        console.log(trendingDaily);
        console.log(trendingWeekly);
    }, []);

    // const {data: daily, isLoading: isDailyLoading, } = use:w

    return (
        <GeneralLayout title="Trending Movies">
            <TrendingLayout
                daily={trendingDaily}
                weekly={trendingWeekly}
                mediaType="movie"
            />
        </GeneralLayout>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    const {
        data: trendingDaily
    }: ResponseWithDetails<Trending> = await tmdbFetch.get(
        '/trending/movie/day'
    );
    const {
        data: trendingWeekly
    }: ResponseWithDetails<Trending> = await tmdbFetch.get(
        '/trending/movie/week'
    );

    return {
        props: {
            trendingDaily,
            trendingWeekly
        },
        revalidate: 3600
    };
};

export default TrendingMovies;
