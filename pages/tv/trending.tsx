import GeneralLayout from 'layouts/GeneralLayout';
import { GetStaticProps } from 'next';
import { useEffect } from 'react';
import tmdbFetch from 'utils/tmdbFetch';

interface TrendingTVShowsProps {
    trendingDaily: string;
    trendingWeekly: string;
}

const TrendingTVShows = ({
    trendingDaily,
    trendingWeekly
}: TrendingTVShowsProps) => {
    useEffect(() => {
        console.log(trendingDaily);
        console.log(trendingWeekly);
    }, []);

    return (
        <GeneralLayout title="Trending Movies">
            <></>
        </GeneralLayout>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    const {
        data: trendingDaily
    }: ResponseWithDetails<Trending> = await tmdbFetch.get('/trending/tv/day');
    const {
        data: trendingWeekly
    }: ResponseWithDetails<Trending> = await tmdbFetch.get('/trending/tv/week');

    return {
        props: {
            trendingDaily,
            trendingWeekly
        },
        revalidate: 3600
    };
};

export default TrendingTVShows;
