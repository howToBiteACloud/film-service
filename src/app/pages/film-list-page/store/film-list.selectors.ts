import { createFeatureSelector, createSelector } from '@ngrx/store';

import {
    FilmData,
    FilmListFilters,
    Genre,
    RequestStatus,
} from '../../../models';
import { FILM_FEATURE_KEY } from './film-list.reducer';

export interface FilmListState {
    films: Array<FilmData>;
    totalPages: number;
    status: RequestStatus;
    currentPage: number;
    filters: FilmListFilters;
    genres: Array<Genre>;
    date: number | null;
}

const selectFilmListState =
    createFeatureSelector<FilmListState>(FILM_FEATURE_KEY);

const selectFilms = createSelector(
    selectFilmListState,
    (state: FilmListState) => state.films,
);

const selectFilmListIsLoading = createSelector(
    selectFilmListState,
    (state: FilmListState) => state.status === RequestStatus.Loading,
);

const selectFilmListTotalPages = createSelector(
    selectFilmListState,
    (state: FilmListState) => state.totalPages,
);

const selectCurrentPage = createSelector(
    selectFilmListState,
    (state: FilmListState) => state.currentPage,
);

const selectFilters = createSelector(
    selectFilmListState,
    (state: FilmListState) => state.filters,
);

const selectGenres = createSelector(
    selectFilmListState,
    (state: FilmListState) => state.genres,
);

export const filmListSelectors = {
    filmList: selectFilms,
    isLoading: selectFilmListIsLoading,
    totalPages: selectFilmListTotalPages,
    currentPage: selectCurrentPage,
    filters: selectFilters,
    genres: selectGenres,
};
