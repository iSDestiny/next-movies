declare module 'react-modal-video';

interface Trending {
    page: number;
    results?: TrendingResultsEntity[] | null;
    total_pages: number;
    total_results: number;
}

interface TrendingResultsEntity {
    overview: string;
    backdrop_path: string;
    vote_count: number;
    genre_ids?: number[] | null;
    first_air_date?: string | null;
    original_language: string;
    id: number;
    original_name?: string | null;
    origin_country?: string[] | null;
    poster_path: string;
    vote_average: number;
    name?: string | null;
    popularity: number;
    media_type: string;
    original_title?: string | null;
    video?: boolean | null;
    title?: string | null;
    adult?: boolean | null;
    release_date?: string | null;
}

interface TMDBConfig {
    images: TMDBImages;
    change_keys?: string[] | null;
}

interface TMDBImages {
    base_url: string;
    secure_base_url: string;
    backdrop_sizes?: string[] | null;
    logo_sizes?: string[] | null;
    poster_sizes?: string[] | null;
    profile_sizes?: string[] | null;
    still_sizes?: string[] | null;
}

interface Video {
    id: number;
    results?: VideoResultsEntity[] | null;
}

interface VideoResultsEntity {
    id: string;
    iso_639_1: string;
    iso_3166_1: string;
    key: string;
    name: string;
    site: string;
    size: number;
    type: string;
}
