import { createFeature, createReducer, on } from '@ngrx/store';

import { RequestStatus } from '../../../models';
import { filmListActions } from './film-list.actions';
import { FilmListState } from './film-list.selectors';

export const FILM_FEATURE_KEY = 'filmListFeature';

export const initialState: FilmListState = {
    films: [],
    totalPages: 0,
    status: RequestStatus.None,
    currentPage: 1,
    filters: {},
    genres: [],
    date: null,
};

export const filmListReducer = createReducer(
    initialState,
    on(filmListActions.load, (state) => ({
        ...state,
        films: [],
        status: RequestStatus.Loading,
    })),
    on(filmListActions.closed, () => initialState),
    on(filmListActions.loadSuccess, (state, { films }) => {
        return {
            ...state,
            films: films.results,
            totalPages: films.total_pages,
            status: RequestStatus.Success,
        };
    }),
    on(filmListActions.loadFail, (state) => ({
        ...state,
        status: RequestStatus.Fail,
    })),
    on(filmListActions.changePage, (state, { currentPage }) => ({
        ...state,
        currentPage,
    })),
    on(filmListActions.updateFilters, (state, { filters }) => ({
        ...state,
        filters,
    })),
    on(filmListActions.loadGenresSuccess, (state, { genres }) => ({
        ...state,
        genres,
    })),
);

export const filmListFeature = createFeature({
    name: FILM_FEATURE_KEY,
    reducer: filmListReducer,
});
