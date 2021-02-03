import axios from 'axios';

const tmdbFetchGzip = axios.create({
    baseURL: 'http://files.tmdb.org/p/exports',
    params: {
        api_key: process.env.TMDB_API_KEY
    }
});

export default tmdbFetchGzip;
