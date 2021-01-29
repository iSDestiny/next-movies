import axios from 'axios';

const tmdbFetch = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    params: {
        api_key: process.env.TMDB_API_KEY
    }
});

export default tmdbFetch;
