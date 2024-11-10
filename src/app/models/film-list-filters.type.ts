import { Genre } from './genre.type';

export type FilmListFilters = Readonly<{
    genres?: Genre[];
    dates?: number;
}>;
