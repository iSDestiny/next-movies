import useDiscover from 'hooks/useDiscover';
import GeneralLayout from 'layouts/GeneralLayout';
import SpecficFilterLayout from 'layouts/SpecficFilterLayout';
import SpecificFilterFallbackSkeleton from 'layouts/SpecificFilterLayoutSkeleton';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import capitalize from 'utils/capitalize';
import getAllFetchResponseResultIds, {
    HasId
} from 'utils/getAllFetchResponseResultIds';
import tmdbFetch from 'utils/tmdbFetch';

interface KeywordProps {
    keyword: GenresEntityOrKeywordsEntity;
    movies: PopularMovies;
    tvShows: PopularTVShows;
    config: TMDBConfig;
}

const Keyword = ({ keyword, movies, tvShows, config }: KeywordProps) => {
    const router = useRouter();

    const movieCategory = useDiscover(
        'movie',
        movies as PopularMoviesAndPopularTVShows,
        {
            includeKeywords: keyword ? keyword.id + '' : null
        },
        Boolean(keyword?.id)
    );
    const tvShowCategory = useDiscover(
        'tv',
        tvShows as PopularMoviesAndPopularTVShows,
        {
            includeKeywords: keyword ? keyword.id + '' : null
        },
        Boolean(keyword?.id)
    );

    const categories = [movieCategory, tvShowCategory];

    if (router.isFallback)
        return (
            <GeneralLayout title="Loading keyword movies and shows...">
                <SpecificFilterFallbackSkeleton />
            </GeneralLayout>
        );

    return (
        <GeneralLayout
            title={`"${capitalize(keyword.name)}" Movies and TV Shows`}
        >
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

async function getKeywordIds<T extends HasId>(
    paths: string[],
    media_type: 'movie' | 'tv'
) {
    const results = await getAllFetchResponseResultIds<T>(paths);
    const details = (await Promise.allSettled(
        results.map((id) =>
            tmdbFetch.get(`/${media_type}/${id}`, {
                params: {
                    append_to_response: 'keywords'
                }
            })
        )
    )) as any;
    const relevantItems = details.map(
        ({
            status,
            value
        }: {
            status: string;
            value: { data: TVShowDetails | MovieDetails };
        }) => (status === 'fulfilled' ? value.data.keywords.keywords : null)
    ) as GenresEntityOrKeywordsEntity[];
    return [...new Set(relevantItems.flat().map((keyword) => keyword?.id))];
}

export const getStaticPaths: GetStaticPaths = async () => {
    const movieKeywordIds = await getKeywordIds<Movie>(
        [
            '/movie/popular',
            '/movie/top_rated',
            '/movie/upcoming',
            '/movie/now_playing',
            '/trending/movie/week'
        ],
        'movie'
    );

    const tvShowKeywordIds = await getKeywordIds<TVShow>(
        [
            '/tv/popular',
            '/tv/top_rated',
            '/tv/on_the_air',
            '/tv/airing_today',
            '/trending/tv/week'
        ],
        'tv'
    );

    const ids = [...new Set([...tvShowKeywordIds, ...movieKeywordIds])].filter(
        (id) => id !== null && id !== undefined
    );

    const paths = ids.map((id) => {
        if (id) return { params: { id: id + '' } };
        return { params: { id: null } };
    });

    return {
        paths,
        fallback: true
    };
};

export default Keyword;
