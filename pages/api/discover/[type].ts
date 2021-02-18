import { NextApiRequest, NextApiResponse } from 'next';
import tmdbFetch from 'utils/tmdbFetch';

const handler = async (
    { query, method }: NextApiRequest,
    res: NextApiResponse
) => {
    if (method === 'GET') {
        const { data }: { data: SearchResults } = await tmdbFetch.get(
            `/discover/${query.type}`,
            {
                params: {
                    ...query
                }
            }
        );

        return res.status(200).json({ ...data });
    }
    return res.status(405).end();
};

export default handler;
