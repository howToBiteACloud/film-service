import { createSelector } from '@ngrx/store';

import { FilmData, RequestState } from '../../../models';

export interface FilmState {
    film: RequestState<FilmData | null>;
}

export interface AppState {
    filmFeature: FilmState;
}

// const selectFeature = createFeatureSelector<FilmState>(FILM_FEATURE_KEY);

const selectFilmState = (state: AppState) => state.filmFeature;

export const selectFilm = createSelector(
    selectFilmState,
    (state: FilmState) => state.film.value,
);
