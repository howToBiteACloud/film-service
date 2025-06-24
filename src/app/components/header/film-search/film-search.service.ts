import { DestroyRef, inject, Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, NEVER } from 'rxjs';
import {
    catchError,
    debounceTime,
    filter,
    map,
    switchMap,
    tap,
} from 'rxjs/operators';

import { TmdbApiService } from '../../../apis/tmdb-api.service';
import { FilmsResponse, RequestState, RequestStatus } from '../../../models';
import {
    failRequest,
    loadingRequest,
    noneRequest,
    successRequest,
} from '../../../shared/utils';

@Injectable()
export class FilmSearchService {
    private readonly tmdbApiService = inject(TmdbApiService);
    private readonly destroyRef = inject(DestroyRef);

    private readonly state$ = new BehaviorSubject<
        RequestState<FilmsResponse | null>
    >(noneRequest());

    readonly filmsResponse$ = this.state$.pipe(map((state) => state.value));
    readonly films$ = this.filmsResponse$.pipe(
        map((filmsResponse) => filmsResponse?.results),
    );
    readonly isLoading$ = this.state$.pipe(
        map((state) => state.status === RequestStatus.Loading),
    );

    readonly searchControl = new FormControl<string>('');

    initialize() {
        this.loadFilmsByName();
    }

    loadFilmsByName() {
        this.searchControl.valueChanges
            .pipe(
                filter((value: string | null): value is string =>
                    value ? value.length >= 3 : false,
                ),
                debounceTime(500),
                tap(() => this.state$.next(loadingRequest())),
                switchMap((search) =>
                    this.tmdbApiService.getFilmsByName(search),
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
