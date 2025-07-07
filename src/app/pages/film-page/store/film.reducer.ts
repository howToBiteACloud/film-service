import { createFeature, createReducer, on } from '@ngrx/store';

import { FilmData } from '../../../models';
import {
    failRequest,
    loadingRequest,
    noneRequest,
    successRequest,
} from '../../../shared/utils';
import { filmActions } from './film.actions';
import { FilmState } from './film.selectors';

export const initialState: FilmState = {
    film: noneRequest(),
};

export const filmReducer = createReducer(
    initialState,
    on(filmActions.load, (state) => ({ ...state, film: loadingRequest(null) })),
    on(filmActions.loadSuccess, (state, { film }) => {
        return { ...state, film: successRequest(film) };
    }),
    on(filmActions.loadFail, (state, { error }) => ({
        ...state,
        film: failRequest(error),
    })),
    on(filmActions.changeRateSuccess, (state, { rate }) => {
        const updatedFilm = {
            ...state.film.value,
            account_states: {
                ...(state.film.value!.account_states ?? {}),
                watchlist: false,
                rated: { value: rate },
            },
        } as FilmData;

        return {
            ...state,
            film: successRequest(updatedFilm),
        };
    }),
    on(filmActions.deleteRateSuccess, (state) => {
        const updatedFilm = {
            ...state.film.value,
            account_states: {
                ...(state.film.value!.account_states ?? {}),
                rated: false,
            },
        } as FilmData;

        return {
            ...state,
            film: successRequest(updatedFilm),
        };
    }),
    on(filmActions.changeWatchlistSuccess, (state, { watchlist }) => {
        const updatedFilm = {
            ...state.film.value,
            account_states: {
                ...(state.film.value?.account_states ?? {}),
                watchlist,
            },
        } as FilmData;

        return {
            ...state,
            film: successRequest(updatedFilm),
        };
    }),
    on(filmActions.changeFavoriteSuccess, (state, { favorite }) => {
        const updatedFilm = {
            ...state.film.value,
            account_states: {
                ...(state.film.value?.account_states ?? {}),
                favorite,
            },
        } as FilmData;

        return {
            ...state,
            film: successRequest(updatedFilm),
        };
    }),
);

export const filmFeature = createFeature({
    name: 'filmFeature',
    reducer: filmReducer,
});
