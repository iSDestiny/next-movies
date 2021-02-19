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

interface PopularMoviesAndPopularTVShows extends QueryList {
    results?: MovieAndTVShow[];
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
    first_air_date?: string;
    genre_ids?: number[] | null;
}

interface MovieAndTVShow extends TVShow, Movie {}

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
    results?: GenresEntityOrKeywordsEntity[] | null;
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

interface Media {
    path: string;
    original: string;
}

interface Language {
    iso_639_1: string;
    english_name: string;
    name: string;
}

interface TVShowDetails {
    backdrop_path: string;
    created_by?: CreatedByEntity[] | null;
    episode_run_time?: number[] | null;
    first_air_date: string;
    genres?: GenresEntityOrResultsEntity[] | null;
    homepage: string;
    id: number;
    in_production: boolean;
    languages?: string[] | null;
    last_air_date: string;
    last_episode_to_air: LastEpisodeToAirOrNextEpisodeToAir;
    name: string;
    next_episode_to_air: LastEpisodeToAirOrNextEpisodeToAir;
    networks?: NetworksEntityOrProductionCompaniesEntity[] | null;
    number_of_episodes: number;
    number_of_seasons: number;
    origin_country?: string[] | null;
    original_language: string;
    original_name: string;
    overview: string;
    popularity: number;
    poster_path: string;
    production_companies?: NetworksEntityOrProductionCompaniesEntity[] | null;
    production_countries?: ProductionCountriesEntity[] | null;
    seasons?: SeasonsEntity[] | null;
    spoken_languages?: Language[] | null;
    status: string;
    tagline: string;
    type: string;
    vote_average: number;
    vote_count: number;
    content_ratings: ContentRatings;
    reviews: Reviews;
    similar: SimilarOrRecommendations;
    images: Images;
    credits: Credits;
    videos: Videos;
    recommendations: SimilarOrRecommendations;
    keywords: Keywords;
}
interface CreatedByEntity {
    id: number;
    credit_id: string;
    name: string;
    gender: number;
    profile_path?: null;
}
interface GenresEntityOrResultsEntity {
    id: number;
    name: string;
}
interface LastEpisodeToAirOrNextEpisodeToAir {
    air_date: string;
    episode_number: number;
    id: number;
    name: string;
    overview: string;
    production_code: string;
    season_number: number;
    still_path: string;
    vote_average: number;
    vote_count: number;
}
interface NetworksEntityOrProductionCompaniesEntity {
    name: string;
    id: number;
    logo_path: string;
    origin_country: string;
}
interface ProductionCountriesEntity {
    iso_3166_1: string;
    name: string;
}
interface SeasonsEntity {
    air_date: string;
    episode_count: number;
    id: number;
    name: string;
    overview: string;
    poster_path: string;
    season_number: number;
}
interface SpokenLanguagesEntity {
    english_name: string;
    iso_639_1: string;
    name: string;
}
interface ContentRatings {
    results?: ContentResultsEntity[] | null;
}
interface ContentResultsEntity {
    iso_3166_1: string;
    rating: string;
}
interface ResultsEntity4 {
    backdrop_path: string;
    first_air_date: string;
    genre_ids?: number[] | null;
    id: number;
    name: string;
    origin_country?: (string | null)[] | null;
    original_language: string;
    original_name: string;
    overview: string;
    poster_path: string;
    vote_average: number;
    vote_count: number;
    networks?: NetworksEntity[] | null;
    popularity: number;
}
interface NetworksEntity {
    id: number;
    logo: Logo;
    name: string;
    origin_country: string;
}
interface Logo {
    path: string;
    aspect_ratio: number;
}

interface SearchResults {
    page: number;
    results?: SearchResult[] | null;
    total_pages: number;
    total_results: number;
}
interface SearchResult {
    adult?: boolean | null;
    backdrop_path?: string | null;
    genre_ids?: (number | null)[] | null;
    id: number;
    media_type: string;
    original_language?: string | null;
    original_title?: string | null;
    overview?: string | null;
    popularity: number;
    poster_path?: string | null;
    release_date?: string | null;
    title?: string | null;
    video?: boolean | null;
    vote_average?: number | null;
    vote_count?: number | null;
    first_air_date?: string | null;
    name?: string | null;
    origin_country?: string[] | null;
    original_name?: string | null;
    gender?: number | null;
    known_for?: KnownForEntity[] | null;
    known_for_department?: string | null;
    profile_path?: string | null;
    logo_path?: string | null;
}
interface KnownForEntity {
    adult: boolean;
    backdrop_path?: string | null;
    genre_ids?: number[] | null;
    id: number;
    media_type: string;
    original_language: string;
    original_title: string;
    overview: string;
    poster_path: string;
    release_date: string;
    title?: string;
    name?: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

interface ProductionCompanyDetails {
    id: number;
    name: string;
    homepage?: string;
    headquarters?: string;
    origin_country?: string;
    parent_company?: string;
    description?: string;
    logo_path?: string;
}

interface PersonDetails {
    adult: boolean;
    also_known_as?: string[] | null;
    biography: string;
    birthday: string;
    deathday?: null;
    gender: number;
    homepage?: null;
    id: number;
    imdb_id: string;
    known_for_department: string;
    name: string;
    place_of_birth: string;
    popularity: number;
    profile_path: string;
    combined_credits: CombinedCredits;
    images: PersonImages;
}
interface CombinedCredits {
    cast?: CombinedCastEntity[] | null;
    crew?: CombinedCrewEntity[] | null;
}
interface CombinedCastEntity {
    id: number;
    video?: boolean | null;
    vote_count: number;
    vote_average: number;
    title?: string | null;
    release_date?: string | null;
    original_language: string;
    original_title?: string | null;
    genre_ids?: number[] | null;
    backdrop_path?: string | null;
    adult?: boolean | null;
    overview: string;
    poster_path?: string | null;
    popularity: number;
    character: string;
    credit_id: string;
    order?: number | null;
    media_type: string;
    first_air_date?: string | null;
    name?: string | null;
    origin_country?: (string | null)[] | null;
    original_name?: string | null;
    episode_count?: number | null;
}
interface CombinedCrewEntity {
    adult?: boolean | null;
    backdrop_path?: string | null;
    genre_ids?: (number | null)[] | null;
    id: number;
    original_language: string;
    original_title?: string | null;
    overview: string;
    poster_path?: string | null;
    release_date?: string | null;
    title?: string | null;
    video?: boolean | null;
    vote_average: number;
    vote_count: number;
    popularity: number;
    credit_id: string;
    department: string;
    job: string;
    media_type: string;
    first_air_date?: string | null;
    name?: string | null;
    original_name?: string | null;
    origin_country?: string[] | null;
    episode_count?: number | null;
}

interface CombinedCrewEntityAndCastEntity
    extends CombinedCrewEntity,
        CombinedCastEntity {}
interface PersonImages {
    profiles?: ProfilesEntity[] | null;
}
interface ProfilesEntity {
    aspect_ratio: number;
    file_path: string;
    height: number;
    iso_639_1?: null;
    vote_average: number;
    vote_count: number;
    width: number;
}
