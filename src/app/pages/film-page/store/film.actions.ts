import { createAction, props } from '@ngrx/store';

import { FilmData } from '../../../models';

const loadFilm = createAction(
    '[Film page] Load Film',
    props<{ filmId: string }>(),
);

const filmLoadSuccess = createAction(
    '[Film page] Film Loaded Success',
    props<{ film: FilmData }>(),
);

const filmLoadFail = createAction(
    '[Film page] Film Loaded Error',
    props<{ error: Error }>(),
);

const closed = createAction('[Film Page] Page closed');

const changeFilmRate = createAction(
    '[Film page] Change Film Rate',
    props<{ rate: number; filmId: number }>(),
);

const changeFilmRateSuccess = createAction(
    '[Film page] Change Film Rate Succes',
    props<{ rate: number }>(),
);

const deleteFilmRateSuccess = createAction(
    '[Film page] Delete Film Rate Success',
);

const deleteFilmRate = createAction(
    '[Film page] Delete Film Rate',
    props<{ filmId: number }>(),
);

const changeFavoriteFilm = createAction(
    '[Film page] Change Favorite Film',
    props<{ accountId: number; filmId: number; favorite: boolean }>(),
);

const changeFavoriteFilmSuccess = createAction(
    '[Film page] Change Favorite Film Success',
    props<{ favorite: boolean }>(),
);

const changeWatchlistFilm = createAction(
    '[Film page] Change Watch List',
    props<{ accountId: number; filmId: number; watchlist: boolean }>(),
);

const changeWatchlistFilmSuccess = createAction(
    '[Film page] Change Watch List Success',
    props<{ watchlist: boolean }>(),
);

export const filmActions = {
    closed,

    load: loadFilm,
    loadSuccess: filmLoadSuccess,
    loadFail: filmLoadFail,

    changeRate: changeFilmRate,
    changeRateSuccess: changeFilmRateSuccess,

    deleteRate: deleteFilmRate,
    deleteRateSuccess: deleteFilmRateSuccess,

    changeWatchlist: changeWatchlistFilm,
    changeWatchlistSuccess: changeWatchlistFilmSuccess,

    changeFavorite: changeFavoriteFilm,
    changeFavoriteSuccess: changeFavoriteFilmSuccess,
};
