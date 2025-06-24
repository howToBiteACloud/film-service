import { DestroyRef, inject, Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BehaviorSubject, combineLatest, NEVER } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import { TmdbApiService } from '../../../apis/tmdb-api.service';
import { FilmsResponse, RequestState, RequestStatus } from '../../../models';
import { AuthorizationService } from '../../../shared/services/authorization.service';
import {
    failRequest,
    loadingRequest,
    successRequest,
} from '../../../shared/utils';

@Injectable({
    providedIn: 'root',
})
export class WatchListFilmsService {
    private readonly destroyRef = inject(DestroyRef);
    private readonly tmdbApiService = inject(TmdbApiService);
    private readonly authorizationService = inject(AuthorizationService);

    private readonly currentPage$ = new BehaviorSubject<number>(1);
    private readonly state$ = new BehaviorSubject<
        RequestState<FilmsResponse | null>
    >(loadingRequest());

    readonly watchList$ = this.state$.pipe(
        map((state) => state.value?.results ?? []),
    );

    readonly isLoading$ = this.state$.pipe(
        map((state) => state.status === RequestStatus.Loading),
    );

    readonly totalPages$ = this.state$.pipe(
        map((state) => state.value?.total_pages),
    );

    initialize() {
        this.loadFilmsEffect();
    }

    pageChange(pageNumber: number) {
        this.currentPage$.next(pageNumber);
    }

    private loadFilmsEffect() {
        const sessionId = this.authorizationService.getSessionId()!;

        combineLatest([this.currentPage$, this.authorizationService.account$])
            .pipe(
                tap(() => {
                    this.state$.next(loadingRequest());
                }),
                switchMap(([page, account]) =>
                    this.tmdbApiService.getWatchList(
                        page,
                        account!.id,
                        sessionId,
                    ),
                ),
                catchError((error) => {
                    this.state$.next(failRequest(error));

                    return NEVER;
                }),
                takeUntilDestroyed(this.destroyRef),
            )
            .subscribe((response) => {
                this.state$.next(successRequest(response));
            });
    }
}
