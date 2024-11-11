import { inject, Injectable, OnDestroy } from '@angular/core';
import { catchError, map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { BehaviorSubject, combineLatest, NEVER, Subject } from 'rxjs';
import { TmdbApiService } from '../../../apis/tmdb-api.service';
import {
    FilmsResponse,
    DiscoverMovieParams,
    FilmListFilters,
    Genre,
} from '../../../models';

enum RequestStatus {
    None,
    Loading,
    Success,
    Fail,
}

type State = {
    status: RequestStatus;
    value: FilmsResponse | null;
    error: Error | null;
};

@Injectable()
export class FilmService implements OnDestroy {
    private readonly tmdbApiService = inject(TmdbApiService);

    private readonly destroy$ = new Subject<void>();

    private readonly currentPage$ = new BehaviorSubject<number>(1);
    private readonly currentFilters$ = new BehaviorSubject<FilmListFilters>({});

    private readonly state$ = new BehaviorSubject<State>({
        status: RequestStatus.None,
        value: null,
        error: null,
    });

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

    constructor() {
        this.loadFilmsEffect();
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }

    pageChange(pageNumber: number) {
        this.currentPage$.next(pageNumber);
    }

    controlsChange(controls: FilmListFilters) {
        this.currentFilters$.next(controls);
    }

    private loadFilmsEffect() {
        const params$ = combineLatest({
            page: this.currentPage$,
            filters: this.currentFilters$,
        }).pipe(map(({ page, filters }) => makeFilmParams(page, filters)));

        params$
            .pipe(
                tap(() => {
                    this.state$.next({
                        status: RequestStatus.Loading,
                        value: null,
                        error: null,
                    });
                }),
                switchMap((params) => this.tmdbApiService.getFilms(params)),
                catchError((error) => {
                    this.state$.next({
                        status: RequestStatus.Fail,
                        value: null,
                        error,
                    });

                    return NEVER;
                }),
                takeUntil(this.destroy$)
            )
            .subscribe((response) => {
                this.state$.next({
                    status: RequestStatus.Success,
                    value: response,
                    error: null,
                });
            });
    }
}

function makeFilmParams(page: number, filters: FilmListFilters) {
    const with_genres = filters.genres
        ? filters.genres.map((genre: Genre) => genre.id).join(',')
        : null;
    const primary_release_year = filters.dates;

    const params: DiscoverMovieParams = {
        page,
        ...(with_genres ? { with_genres } : {}),
        ...(primary_release_year ? { primary_release_year } : {}),
    };

    return params;
}
