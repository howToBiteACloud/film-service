import { SortingFilmList } from './sorting-film-list.enum';

export type FilmListFilters = Readonly<{
    genres?: number[];
    dates?: number;
    sorting?: SortingFilmList;
}>;
