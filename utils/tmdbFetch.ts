import axios from 'axios';

const tmdbFetch = axios.create({
    baseURL: 'https://api.themoviedb.org/3'
});

tmdbFetch.interceptors.request.use((config) => {
    config.params = {
        ...config.params,
        api_key: process.env.TMDB_API_KEY
    };
    return config;
});

export default tmdbFetch;
