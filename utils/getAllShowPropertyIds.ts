import getAllFetchResponseResultIds, {
    HasId
} from 'utils/getAllFetchResponseResultIds';
import tmdbFetch from './tmdbFetch';

async function getAllShowPropertyIds<T extends HasId, A extends HasId>(
    paths: string[],
    media_type: 'tv' | 'movie',
    prop_type: string
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
        }) => (status === 'fulfilled' ? value.data[prop_type] : null)
    ) as A[];
    return [...new Set(relevantItems.flat().map(({ id }) => id))];
}

export default getAllShowPropertyIds;
