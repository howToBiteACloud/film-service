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
import { filmListActions } from './store/film-list.actions';
import { selectFilmList } from './store/film-list.selectors';

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

    readonly films$ = this.store.select(selectFilmList.filmList);
    readonly totalPages$ = this.store.select(selectFilmList.totalPages);
    readonly isLoading$ = this.store.select(selectFilmList.isLoading);

    ngOnInit() {
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
