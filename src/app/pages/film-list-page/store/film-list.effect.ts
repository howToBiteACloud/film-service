import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import {
    catchError,
    map,
    of,
    switchMap,
    takeUntil,
    withLatestFrom,
} from 'rxjs';

import { TmdbApiService } from '../../../apis/tmdb-api.service';
import { makeFilmParams } from '../helpers';
import { filmListActions } from './film-list.actions';
import { filmListSelectors } from './film-list.selectors';

@Injectable()
export class FilmListEffects {
    private readonly actions$ = inject(Actions);
    private readonly tmdbApiService = inject(TmdbApiService);
    private readonly store = inject(Store);
    private readonly destroy$ = this.actions$.pipe(
        ofType(filmListActions.closed),
    );

    private readonly loadFilms$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(filmListActions.load),
            withLatestFrom(
                this.store.select(filmListSelectors.currentPage),
                this.store.select(filmListSelectors.filters),
            ),
            map(([_, currentPage, filters]) => {
                console.log(filters);
                return makeFilmParams(currentPage, filters);
            }),
            switchMap((params) =>
                this.tmdbApiService.getFilms(params).pipe(
                    map((response) =>
                        filmListActions.loadSuccess({ films: response }),
                    ),
                    catchError((error) =>
                        of(filmListActions.loadFail({ error })),
                    ),
                    takeUntil(this.destroy$),
                ),
            ),
        );
    });

    private readonly loadGenres$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(filmListActions.loadGenres),
            switchMap(() => {
                return this.tmdbApiService.getGenres().pipe(
                    map((genres) =>
                        filmListActions.loadGenresSuccess({ genres }),
                    ),
                    takeUntil(this.destroy$),
                );
            }),
        );
    });
}
