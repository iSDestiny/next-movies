import tmdbFetch from './tmdbFetch';

async function getAllFetchResponseResults<T>(paths: string[]) {
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

export default getAllFetchResponseResults;
