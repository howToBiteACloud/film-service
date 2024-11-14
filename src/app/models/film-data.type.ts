import { BelongsToCollection } from './belongs-to-collection.type';
import { CreditsResponse } from './credits-response.type';
import { FilmVideosResponse } from './film-videos-response.type';
import { Genre } from './genre.type';
import { ProductionCompany } from './production-company.type';
import { ProductionCountry } from './production-country.type';
import { RecommendationsResponse } from './recommendations-response.type';
import { SpokenLanguage } from './spoken-language.type';

export type CommonFilmData = Readonly<{
    id: number;
    adult: boolean;
    backdrop_path: string;
    original_title: string;
    original_language: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}>;

export type FilmData = CommonFilmData &
    Readonly<{
        belongs_to_collection: BelongsToCollection;
        budget: number;
        genres: Genre[];
        homepage: string;
        imdb_id: string;
        origin_country: string[];
        production_companies: ProductionCompany[];
        production_countries: ProductionCountry[];
        revenue: number;
        runtime: number;
        spoken_languages: SpokenLanguage[];
        status: string; // enum
        tagline: string;

        // additional
        credits: CreditsResponse;
        videos: FilmVideosResponse;
        recommendations: RecommendationsResponse;
    }>;
