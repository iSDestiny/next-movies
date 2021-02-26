import useDiscover from 'hooks/useDiscover';
import GeneralLayout from 'layouts/GeneralLayout';
import SpecficFilterLayout from 'layouts/SpecficFilterLayout';
import SpecificFilterFallbackSkeleton from 'layouts/SpecificFilterLayoutSkeleton';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import getAllCompanyOrNetworkIds from 'utils/getAllCompanyOrNetworkIds';
import getAllFetchResponseResultIds from 'utils/getAllFetchResponseResultIds';
import tmdbFetch from 'utils/tmdbFetch';

interface NetworkProps {
    network: ProductionCompanyDetails;
    tvShows: PopularTVShows;
    config: TMDBConfig;
}

const Network = ({ network, tvShows, config }: NetworkProps) => {
    const router = useRouter();

    const tvShowCategory = useDiscover(
        'tv',
        tvShows as PopularMoviesAndPopularTVShows,
        { includeNetworks: network ? network.id : null },
        Boolean(network?.id)
    );

    const categories = [null, tvShowCategory];

    if (router.isFallback)
        return (
            <GeneralLayout title={`Loading Network...`}>
                <SpecificFilterFallbackSkeleton type="network" />
            </GeneralLayout>
        );

    return (
        <GeneralLayout title={`TV Shows on ${network.name}`}>
            <SpecficFilterLayout
                type="network"
                config={config}
                heading={network.name}
                categories={categories}
                company={network}
            />
        </GeneralLayout>
    );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const { id } = params;
    let tvShows: PopularTVShows;
    let config: TMDBConfig;
    let network: ProductionCompanyDetails;

    try {
        const { data: configData } = await tmdbFetch.get('/configuration');
        const { data: tvData } = await tmdbFetch.get('/discover/tv', {
            params: {
                with_networks: id
            }
        });

        const {
            data: companyData
        }: { data: ProductionCompanyDetails } = await tmdbFetch.get(
            `/network/${id}`
        );

        config = configData;
        tvShows = tvData;
        network = companyData;

        if (!network) throw new Error('network is null');

        return {
            props: {
                network,
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
    const relevantNetworkIds = await getAllCompanyOrNetworkIds(
        [
            '/tv/popular',
            '/tv/top_rated',
            '/tv/on_the_air',
            '/tv/airing_today',
            '/trending/tv/week'
        ],
        'tv',
        'networks'
    );

    const paths = relevantNetworkIds.map((id) => {
        if (id) return { params: { id: id + '' } };
        console.log('error' + id);
        return { params: { id: null } };
    });

    return {
        paths,
        fallback: true
    };
};

export default Network;
