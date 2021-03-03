import useTrending from 'hooks/useTrending';
import GeneralLayout from 'layouts/GeneralLayout';
import TrendingLayout, { TrendingCategory } from 'layouts/TrendingLayout';
import { GetStaticProps } from 'next';
import { useEffect } from 'react';
import tmdbFetch from 'utils/tmdbFetch';

interface TrendingMoviesProps {
    trendingDaily: Trending;
    trendingWeekly: Trending;
    config: TMDBConfig;
}

const TrendingMovies = ({
    trendingDaily,
    trendingWeekly,
    config
}: TrendingMoviesProps) => {
    const {
        data: daily,
        isLoading: isDailyLoading,
        setPage: setDailyPage,
        page: dailyPage
    } = useTrending('movie', 'day', trendingDaily);
    const {
        data: weekly,
        isLoading: isWeeklyLoading,
        setPage: setWeeklyPage,
        page: weeklyPage
    } = useTrending('movie', 'week', trendingWeekly);

    const categories: TrendingCategory[] = [
        {
            trending: daily,
            isLoading: isDailyLoading,
            setPage: setDailyPage,
            page: dailyPage
        },
        {
            trending: weekly,
            isLoading: isWeeklyLoading,
            setPage: setWeeklyPage,
            page: weeklyPage
        }
    ];

    return (
        <GeneralLayout title="Trending Movies">
            <TrendingLayout
                config={config}
                categories={categories}
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
    const {
        data: config
    }: ResponseWithDetails<TMDBConfig> = await tmdbFetch.get('/configuration');

    return {
        props: {
            trendingDaily,
            trendingWeekly,
            config
        },
        revalidate: 3600
    };
};

export default TrendingMovies;
