import { CommonFilmData } from './film-data.type';

export type RecommendationFilm = CommonFilmData &
    Readonly<{
        genre_ids: number[];
        media_type: string;
    }>;
