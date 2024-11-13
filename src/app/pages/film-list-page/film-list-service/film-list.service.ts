import { inject, Injectable, OnDestroy } from '@angular/core';
import { catchError, map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { BehaviorSubject, combineLatest, NEVER, Subject } from 'rxjs';
import { TmdbApiService } from '../../../apis/tmdb-api.service';
import {
    FilmListFilters,
    FilmsResponse,
    RequestState,
    RequestStatus,
} from '../../../models';
import {
    makeFilmParams,
    noneRequest,
    successRequest,
    loadingRequest,
    failRequest,
} from '../helpers';

@Injectable()
export class FilmListService implements OnDestroy {
    private readonly tmdbApiService = inject(TmdbApiService);

    private readonly destroy$ = new Subject<void>();

    private readonly currentPage$ = new BehaviorSubject<number>(1);
    private readonly currentFilters$ = new BehaviorSubject<FilmListFilters>({});

    private readonly state$ = new BehaviorSubject<RequestState<FilmsResponse>>(
        noneRequest()
    );

    readonly films$ = this.state$.pipe(
        map((state) => state.value?.results ?? [])
    );

    readonly isLoading$ = this.state$.pipe(
        map((state) => state.status === RequestStatus.Loading)
    );

    readonly genres$ = this.tmdbApiService.getGenres();

    readonly totalPages$ = this.state$.pipe(
        map((state) => state.value?.total_pages)
    );

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }

    initialize() {
        this.loadFilmsEffect();
    }

    pageChange(pageNumber: number) {
        this.currentPage$.next(pageNumber);
    }

    controlsChange(controls: FilmListFilters) {
        this.currentFilters$.next(controls);
    }

    private loadFilmsEffect() {
        combineLatest({
            page: this.currentPage$,
            filters: this.currentFilters$,
        })
            .pipe(
                map(({ page, filters }) => makeFilmParams(page, filters)),
                tap(() => {
                    this.state$.next(loadingRequest());
                }),
                switchMap((params) => this.tmdbApiService.getFilms(params)),
                catchError((error) => {
                    this.state$.next(failRequest(error));

                    return NEVER;
                }),
                takeUntil(this.destroy$)
            )
            .subscribe((response) => {
                this.state$.next(successRequest(response));
            });
    }
}
