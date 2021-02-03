declare module 'react-modal-video';

interface QueryList {
    page: number;
    total_pages: number;
    total_results: number;
}

interface Trending extends QueryList {
    results?: TrendingResultsEntity[] | null;
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

interface PopularMovies extends QueryList {
    results?: Movie[] | null;
}

interface PopularTVShows extends QueryList {
    results?: TVShow[] | null;
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

interface Videos {
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

interface BulkMovie {
    adult: boolean;
    id: number;
    original_title: string;
    popularity: number;
    video: boolean;
}

interface Movie {
    adult: boolean;
    backdrop_path: string;
    genre_ids?: number[] | null;
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

interface TVShow {
    backdrop_path: string;
    first_air_date: string;
    genre_ids?: number[] | null;
    id: number;
    name: string;
    origin_country?: string[] | null;
    original_language: string;
    original_name: string;
    overview: string;
    popularity: number;
    poster_path: string;
    vote_average: number;
    vote_count: number;
}

interface MovieDetails {
    adult: boolean;
    backdrop_path: string;
    belongs_to_collection: BelongsToCollection;
    budget: number;
    genres?: GenresEntityOrKeywordsEntity[] | null;
    homepage: string;
    id: number;
    imdb_id: string;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    production_companies?: ProductionCompaniesEntity[] | null;
    production_countries?: ProductionCountriesEntity[] | null;
    release_date: string;
    revenue: number;
    runtime: number;
    spoken_languages?: SpokenLanguagesEntity[] | null;
    status: string;
    tagline: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
    release_dates: ReleaseDates;
    reviews: Reviews;
    similar: SimilarOrRecommendations;
    images: Images;
    credits: Credits;
    videos: Videos;
    recommendations: SimilarOrRecommendations;
    keywords: Keywords;
}
interface BelongsToCollection {
    id: number;
    name: string;
    poster_path: string;
    backdrop_path: string;
}
interface GenresEntityOrKeywordsEntity {
    id: number;
    name: string;
}
interface ProductionCompaniesEntity {
    id: number;
    logo_path?: string | null;
    name: string;
    origin_country: string;
}
interface ProductionCountriesEntity {
    iso_3166_1: string;
    name: string;
}
interface SpokenLanguagesEntity {
    english_name: string;
    iso_639_1: string;
    name: string;
}
interface ReleaseDates {
    results?: ResultsEntity[] | null;
}
interface ResultsEntity {
    iso_3166_1: string;
    release_dates?: ReleaseDatesEntity[] | null;
}
interface ReleaseDatesEntity {
    certification: string;
    iso_639_1?: string | null;
    note: string;
    release_date: string;
    type: number;
}
interface Reviews {
    page: number;
    results?: ResultsEntity1[] | null;
    total_pages: number;
    total_results: number;
}
interface ResultsEntity1 {
    author: string;
    author_details: AuthorDetails;
    content: string;
    created_at: string;
    id: string;
    updated_at: string;
    url: string;
}
interface AuthorDetails {
    name: string;
    username: string;
    avatar_path?: string | null;
    rating?: number | null;
}
interface SimilarOrRecommendations {
    page: number;
    results?: ResultsEntity2[] | null;
    total_pages: number;
    total_results: number;
}
interface ResultsEntity2 {
    genre_ids?: number[] | null;
    original_language: string;
    original_title: string;
    id: number;
    video: boolean;
    vote_average: number;
    overview: string;
    release_date: string;
    vote_count: number;
    title: string;
    adult: boolean;
    backdrop_path: string;
    poster_path: string;
    popularity: number;
}
interface Images {
    backdrops?: BackdropsEntityOrPostersEntity[] | null;
    posters?: BackdropsEntityOrPostersEntity[] | null;
}
interface BackdropsEntityOrPostersEntity {
    aspect_ratio: number;
    file_path: string;
    height: number;
    iso_639_1?: string | null;
    vote_average: number;
    vote_count: number;
    width: number;
}
interface Credits {
    cast?: CastEntity[] | null;
    crew?: CrewEntity[] | null;
}
interface CastEntity {
    adult: boolean;
    gender: number;
    id: number;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path?: string | null;
    cast_id: number;
    character: string;
    credit_id: string;
    order: number;
}
interface CrewEntity {
    adult: boolean;
    gender: number;
    id: number;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path?: string | null;
    credit_id: string;
    department: string;
    job: string;
}
interface Keywords {
    keywords?: GenresEntityOrKeywordsEntity[] | null;
}

interface Credits {
    id: number;
    cast?: Cast[] | null;
    crew?: Crew[] | null;
}
interface Cast {
    adult: boolean;
    gender: number;
    id: number;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path?: string | null;
    cast_id: number;
    character: string;
    credit_id: string;
    order: number;
}
interface Crew {
    adult: boolean;
    gender: number;
    id: number;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path?: string | null;
    credit_id: string;
    department: string;
    job: string;
}

interface Keyword {
    id: number;
    name: string;
}

interface Images {
    id: number;
    backdrops?: BackdropsEntityOrPostersEntity[] | null;
    posters?: BackdropsEntityOrPostersEntity[] | null;
}
interface BackdropsEntityOrPostersEntity {
    aspect_ratio: number;
    file_path: string;
    height: number;
    iso_639_1?: string | null;
    vote_average: number;
    vote_count: number;
    width: number;
}
