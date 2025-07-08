import { createAction, props } from '@ngrx/store';

import { FilmListFilters, FilmsResponse, Genre } from '../../../models';

const loadFilms = createAction('[Film List page] Load Film List');

const filmsLoadSuccess = createAction(
    '[Film List page] Film List Loaded Success',
    props<{ films: FilmsResponse }>(),
);

const filmsLoadFail = createAction(
    '[Film List page] Film List Loaded Error',
    props<{ error: Error }>(),
);

const closed = createAction('[Film List Page] Page closed');

const changePage = createAction(
    '[Film List Page] Change Page',
    props<{ currentPage: number }>(),
);

const updateFilters = createAction(
    '[Film List Page] Update Filters',
    props<{ filters: FilmListFilters }>(),
);

const loadGenresSuccess = createAction(
    '[Film List Page] Load Genres Success',
    props<{ genres: Genre[] }>(),
);

const loadGenres = createAction('[Film List Page] Load Genres');

export const filmListActions = {
    closed,
    load: loadFilms,
    loadSuccess: filmsLoadSuccess,
    loadFail: filmsLoadFail,

    changePage,
    updateFilters,

    loadGenresSuccess,
    loadGenres,
};
