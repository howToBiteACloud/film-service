import { CreditsResponse } from './credits-response.type';
import { Genre } from './genre.type';
import { ProductionCompany } from './production-company.type';
import { ProductionCountry } from './production-country.type';
import { SpokenLanguage } from './spoken-language.type';

export type FilmData = Readonly<{
    id: number;
    adult: boolean;
    backdrop_path: string;
    belongs_to_collection: null; // найти тип
    budget: number;
    genres: Genre[];
    homepage: string;
    imdb_id: string;
    origin_country: string[];
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    production_companies: ProductionCompany[];
    production_countries: ProductionCountry[];
    release_date: string;
    revenue: number;
    runtime: number;
    spoken_languages: SpokenLanguage[];
    video: boolean;
    status: string; // enum
    tagline: string;
    title: string;
    vote_average: number;
    vote_count: number;

    // additional
    credits: CreditsResponse;
}>;
