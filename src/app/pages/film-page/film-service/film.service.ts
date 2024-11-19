import { inject, Injectable, OnDestroy } from '@angular/core';
import {
    BehaviorSubject,
    catchError,
    map,
    NEVER,
    Subject,
    takeUntil,
} from 'rxjs';

import { TmdbApiService } from '../../../apis/tmdb-api.service';
import {
    AccountStates,
    FilmData,
    RequestState,
    RequestStatus,
} from '../../../models';
import { AuthorizationService } from '../../../shared/services/authorization.service';
import {
    failRequest,
    loadingRequest,
    noneRequest,
    successRequest,
} from '../../../shared/utils';

@Injectable()
export class FilmService implements OnDestroy {
    private readonly tmdbApiService = inject(TmdbApiService);
    private readonly authorizationService = inject(AuthorizationService);

    private readonly destroy$ = new Subject<void>();
    private readonly state$ = new BehaviorSubject<RequestState<FilmData>>(
        noneRequest(),
    );

    readonly film$ = this.state$.pipe(map((state) => state.value));
    readonly isLoading$ = this.state$.pipe(
        map((state) => state.status === RequestStatus.Loading),
    );

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }

    loadFilm(filmId: string) {
        this.state$.next(loadingRequest());
        this.tmdbApiService
            .getFilm(filmId, this.authorizationService.getSessionId() ?? '')
            .pipe(
                catchError((error) => {
                    this.state$.next(failRequest(error));

                    return NEVER;
                }),
                takeUntil(this.destroy$),
            )
            .subscribe((response) => {
                this.state$.next(successRequest(response));
            });
    }

    changeFavoriteFilm(accountId: number, filmId: number, favorite: boolean) {
        this.tmdbApiService
            .changeFavoriteFilm(
                accountId,
                filmId,
                favorite,
                this.authorizationService.getSessionId() ?? '',
            )
            .subscribe(() => {
                this.updateAccountStates({
                    favorite,
                });
            });
    }

    changeWatchlistFilm(accountId: number, filmId: number, watchlist: boolean) {
        this.tmdbApiService
            .changeWatchListFilm(
                accountId,
                filmId,
                watchlist,
                this.authorizationService.getSessionId() ?? '',
            )
            .subscribe(() => {
                this.updateAccountStates({
                    watchlist,
                });
            });
    }

    changeFilmRate(rate: number, filmId: number) {
        this.tmdbApiService
            .changeFilmRate(
                rate,
                filmId,
                this.authorizationService.getSessionId() ?? '',
            )
            .subscribe(() => {
                this.updateAccountStates({
                    watchlist: false,
                    rated: { value: rate },
                });
            });
    }

    deleteFilmRate(filmId: number) {
        this.tmdbApiService
            .deleteFilmRate(
                filmId,
                this.authorizationService.getSessionId() ?? '',
            )
            .subscribe(() => {
                this.updateAccountStates({
                    rated: false,
                });
            });
    }

    private updateAccountStates(accountState: Partial<AccountStates>) {
        const oldValue = this.state$.value.value!;

        const newValue = {
            ...oldValue,
            account_states: {
                ...(oldValue?.account_states ?? {}),
                ...accountState,
            } as AccountStates,
        };
        this.state$.next(successRequest(newValue));
    }
}
