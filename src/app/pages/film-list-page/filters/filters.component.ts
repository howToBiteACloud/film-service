import {
    ChangeDetectionStrategy,
    Component,
    inject,
    OnInit,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, map } from 'rxjs';

import { FilmListFilters, Genre, SortingFilmList } from '../../../models';
import { getQueryFilters } from '../helpers/get-query-filters';
import { filmListSelectors } from '../store/film-list.selectors';
import { DateFilterComponent } from './date-filter/date-filter.component';
import { GenresFilterComponent } from './genres-filter/genres-filter.component';
import { SortingComponent } from './sorting/sorting.component';

@Component({
    selector: 'app-filters',
    standalone: true,
    imports: [GenresFilterComponent, DateFilterComponent, SortingComponent],
    templateUrl: './filters.component.html',
    styleUrl: './filters.component.less',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FiltersComponent implements OnInit {
    private readonly store = inject(Store);
    private readonly router = inject(Router);
    private readonly activatedRoute = inject(ActivatedRoute);
    // private readonly queryFilters = getQueryFilters(
    //     this.activatedRoute.snapshot.params,
    // );

    protected readonly genresControl = new FormControl<Genre[]>([]);
    protected readonly datesControl = new FormControl<number | null>(null);
    protected readonly sortControl = new FormControl<string>(
        SortingFilmList.popularity,
    );
    protected readonly filtersForm: FormGroup = new FormGroup({
        genres: this.genresControl,
        dates: this.datesControl,
        sorting: this.sortControl,
    });

    ngOnInit() {
        this.activatedRoute.queryParams.subscribe((params: Params) => {
            const queryFilters = getQueryFilters(params);
            this.filtersForm.patchValue(
                {
                    dates: queryFilters.dates,
                    sorting: queryFilters.sorting,
                },
                {
                    emitEvent: false,
                },
            );

            this.store
                .select(filmListSelectors.genres)
                .pipe(
                    filter((genres) => genres.length > 0),
                    map((genres) => {
                        const selectedGenres = queryFilters.genres ?? [];

                        return selectedGenres.map((id) =>
                            genres.find((genre) => genre.id === id),
                        );
                    }),
                )
                .subscribe((genres) => {
                    this.filtersForm.patchValue(
                        { genres },
                        { emitEvent: false },
                    );
                });
        });

        this.filtersForm.valueChanges.subscribe((value) => {
            const actualFilters = {
                genres: value.genres
                    ? value.genres.map((genre: Genre) => genre.id)
                    : null,
                dates: value.dates ?? null,
                sorting: value.sorting ?? SortingFilmList.popularity,
            };

            this.updateQueryParams(actualFilters);
        });
    }

    updateQueryParams(filters: FilmListFilters) {
        this.router.navigate([], {
            relativeTo: this.activatedRoute,
            queryParams: filters,
            queryParamsHandling: 'merge',
        });
    }
}
