import { AsyncPipe } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    inject,
    OnDestroy,
    OnInit,
} from '@angular/core';
import { Store } from '@ngrx/store';

import { FilmCardsComponent } from '../../components/film-cards/film-cards.component';
import { FiltersComponent } from './filters/filters.component';
import { getQueryFilters } from './helpers/get-query-filters';
import { filmListActions } from './store/film-list.actions';
import { filmListSelectors } from './store/film-list.selectors';

@Component({
    selector: 'app-film-list-page',
    standalone: true,
    imports: [FilmCardsComponent, FiltersComponent, AsyncPipe],
    templateUrl: './film-list-page.component.html',
    styleUrl: './film-list-page.component.less',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilmListPageComponent implements OnInit, OnDestroy {
    private readonly store = inject(Store);

    protected readonly films$ = this.store.select(filmListSelectors.filmList);
    protected readonly totalPages$ = this.store.select(
        filmListSelectors.totalPages,
    );
    protected readonly isLoading$ = this.store.select(
        filmListSelectors.isLoading,
    );

    private readonly queryFilters = getQueryFilters();

    ngOnInit() {
        this.store.dispatch(
            filmListActions.updateFilters({ filters: this.queryFilters }),
        );
        this.store.dispatch(filmListActions.load());
        this.store.dispatch(filmListActions.loadGenres());
    }

    ngOnDestroy() {
        this.store.dispatch(filmListActions.closed());
    }

    onPageChaned(pageNumber: number) {
        this.store.dispatch(
            filmListActions.changePage({ currentPage: pageNumber }),
        );
        this.store.dispatch(filmListActions.load());
    }
}
