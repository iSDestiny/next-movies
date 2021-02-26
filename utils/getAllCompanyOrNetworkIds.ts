import getAllFetchResponseResultIds, {
    HasId
} from 'utils/getAllFetchResponseResultIds';
import tmdbFetch from './tmdbFetch';

async function getAllCompanyOrNetworkIds<T extends HasId>(
    paths: string[],
    media_type: 'tv' | 'movie',
    prop_type: 'production_companies' | 'networks'
) {
    const results = await getAllFetchResponseResultIds<T>(paths);
    const details = (await Promise.allSettled(
        results.map((id) => tmdbFetch.get(`${media_type}/${id}`))
    )) as any;
    const relevantItems = details.map(
        ({
            status,
            value
        }: {
            status: string;
            value: { data: TVShowDetails };
        }) => (status === 'fulfilled' ? value.data[prop_type] : null)
    ) as NetworksEntityOrProductionCompaniesEntity[];
    return [...new Set(relevantItems.flat().map(({ id }) => id))];
}

export default getAllCompanyOrNetworkIds;
