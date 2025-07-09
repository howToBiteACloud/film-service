import { Params } from '@angular/router';

import { FilmListFilters, SortingFilmList } from '../../../models';

export function getQueryFilters(queryParams: Params): FilmListFilters {
    const genresFromQuery = queryParams['genres'];
    const genres: string[] = genresFromQuery
        ? Array.isArray(genresFromQuery)
            ? genresFromQuery
            : [genresFromQuery]
        : [];

    return {
        genres: genres.map(Number),
        dates: queryParams['dates'] ?? null,
        sorting: queryParams['sorting'] ?? SortingFilmList.popularity,
    };
}
