import { inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { FilmListFilters, SortingFilmList } from '../../../models';

export function getQueryFilters(): FilmListFilters {
    const queryParams = inject(ActivatedRoute).snapshot.queryParams;
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
