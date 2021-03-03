import tmdbFetch from './tmdbFetch';
export interface HasId {
    id: number;
}

export async function getAllFetchResponseResults<T extends HasId>(
    paths: string[]
) {
    const results = await Promise.all(
        paths.map(async (path) => {
            const {
                data: { results }
            }: ResponseWithResults<T> = await tmdbFetch.get(path);
            return results;
        })
    );
    return results.flat();
}

async function getAllFetchResponseResultIds<T extends HasId>(paths: string[]) {
    const data = await getAllFetchResponseResults<T>(paths);
    const relevantTVIds = [...new Set(data.map(({ id }) => id))];
    return relevantTVIds;
}

export default getAllFetchResponseResultIds;
