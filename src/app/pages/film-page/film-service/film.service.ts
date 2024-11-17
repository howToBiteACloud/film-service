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
import { FilmData, RequestState, RequestStatus } from '../../../models';
import {
    failRequest,
    loadingRequest,
    noneRequest,
    successRequest,
} from '../../film-list-page/helpers';

@Injectable()
export class FilmService implements OnDestroy {
    private readonly tmdbApiService = inject(TmdbApiService);

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
            .getFilm(filmId)
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
}
