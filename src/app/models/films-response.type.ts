import { FilmData } from './film-data.type';

export type FilmsResponse = Readonly<{
    page: number;
    total_pages: number;
    total_results: number;
    results: Array<FilmData>;
}>;
