import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, takeUntil } from 'rxjs/operators';

import { TmdbApiService } from '../../../apis/tmdb-api.service';
import { AuthorizationService } from '../../../shared/services/authorization.service';
import { filmActions } from './film.actions';

@Injectable()
export class FilmEffects {
    private readonly actions$ = inject(Actions);
    private readonly tmdbApiService = inject(TmdbApiService);
    private readonly authorizationService = inject(AuthorizationService);
    private readonly destroy$ = this.actions$.pipe(ofType(filmActions.closed));

    private readonly loadFilms$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(filmActions.load),
            switchMap(({ filmId }) => {
                return this.tmdbApiService
                    .getFilm(
                        filmId,
                        this.authorizationService.getSessionId() ?? '',
                    )
                    .pipe(
                        map((response) =>
                            filmActions.loadSuccess({ film: response }),
                        ),
                        catchError((error) =>
                            of(filmActions.loadFail({ error })),
                        ),
                        takeUntil(this.destroy$),
                        // ! тут нужно отписаться, тем самым отпишемся только от запроса
                    );
            }),
            // ! тут нельзя отписываться от потока, т.к. отпишемся от всего эффекта
        );
    });

    private readonly changeFilmRate$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(filmActions.changeRate),
            switchMap(({ rate, filmId }) => {
                return this.tmdbApiService
                    .changeFilmRate(
                        rate,
                        filmId,
                        this.authorizationService.getSessionId() ?? '',
                    )
                    .pipe(map(() => filmActions.changeRateSuccess({ rate })));
            }),
        );
    });

    private readonly deleteFilmRate$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(filmActions.deleteRate),
            switchMap(({ filmId }) => {
                return this.tmdbApiService
                    .deleteFilmRate(
                        filmId,
                        this.authorizationService.getSessionId() ?? '',
                    )
                    .pipe(map(() => filmActions.deleteRateSuccess()));
            }),
        );
    });

    private readonly changeFavoriteFilm$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(filmActions.changeFavorite),
            switchMap(({ accountId, filmId, favorite }) => {
                return this.tmdbApiService
                    .changeFavoriteFilm(
                        accountId,
                        filmId,
                        favorite,
                        this.authorizationService.getSessionId() ?? '',
                    )
                    .pipe(
                        map(() =>
                            filmActions.changeFavoriteSuccess({
                                favorite,
                            }),
                        ),
                    );
            }),
        );
    });

    private readonly changeWatchlistFilm$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(filmActions.changeWatchlist),
            switchMap(({ accountId, filmId, watchlist }) => {
                return this.tmdbApiService
                    .changeWatchListFilm(
                        accountId,
                        filmId,
                        watchlist,
                        this.authorizationService.getSessionId() ?? '',
                    )
                    .pipe(
                        map(() =>
                            filmActions.changeWatchlistSuccess({
                                watchlist,
                            }),
                        ),
                    );
            }),
        );
    });
}
