import { NextApiRequest, NextApiResponse } from 'next';
import tmdbFetch from 'utils/tmdbFetch';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { page, mediaType, timeWindow } = req.query;

    if (req.method === 'GET') {
        const { data }: { data: SearchResults } = await tmdbFetch.get(
            `/trending/${mediaType}/${timeWindow}`,
            {
                params: {
                    page
                }
            }
        );

        return res.status(200).json({ ...data });
    }
    return res.status(405).end();
};

export default handler;
