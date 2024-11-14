import { inject, Injectable } from '@angular/core';
import {
    BehaviorSubject,
    catchError,
    map,
    NEVER,
    Subject,
    takeUntil,
    tap,
} from 'rxjs';

import { TmdbApiService } from '../../../apis/tmdb-api.service';
import { FilmData, RequestState, RequestStatus } from '../../../models';
import {
    failRequest,
    loadingRequest,
    noneRequest,
    successRequest,
} from '../../film-list-page/helpers';

@Injectable({
    providedIn: 'root',
})
export class FilmService {
    private readonly tmdbApiService = inject(TmdbApiService);

    private readonly destroy$ = new Subject<void>();
    private readonly state$ = new BehaviorSubject<RequestState<FilmData>>(
        noneRequest(),
    );

    readonly film$ = this.state$.pipe(map((state) => state.value));
    readonly isLoading$ = this.state$.pipe(
        map((state) => state.status === RequestStatus.Loading),
    );

    loadFilm(filmId: string) {
        this.tmdbApiService
            .getFilm(filmId)
            .pipe(
                tap(() => {
                    this.state$.next(loadingRequest());
                }),
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
