import { CommonModule } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    inject,
    Input,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { TuiButton, TuiHint, TuiHintDirective, TuiIcon } from '@taiga-ui/core';
import { TuiRating } from '@taiga-ui/kit';

import { AccountData, FilmData } from '../../../models';
import { filmActions } from '../store/film.actions';

@Component({
    selector: 'app-film-actions',
    standalone: true,
    imports: [
        CommonModule,
        TuiButton,
        TuiIcon,
        TuiHint,
        TuiHintDirective,
        FormsModule,
        TuiRating,
    ],
    templateUrl: './film-actions.component.html',
    styleUrl: './film-actions.component.less',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilmActionsComponent {
    private readonly store = inject(Store);

    @Input({ required: true }) film!: FilmData;
    @Input({ required: true }) account!: AccountData;

    toggleFavorite(accountId: number, filmId: number, favorite: boolean) {
        this.store.dispatch(
            filmActions.changeFavorite({ accountId, filmId, favorite }),
        );
    }

    toggleWatchlist(accountId: number, filmId: number, watchlist: boolean) {
        this.store.dispatch(
            filmActions.changeWatchlist({ accountId, filmId, watchlist }),
        );
    }

    changeFilmRate(rate: number, filmId: number) {
        this.store.dispatch(filmActions.changeRate({ rate, filmId }));
    }

    deleteFilmRate(filmId: number) {
        this.store.dispatch(filmActions.deleteRate({ filmId }));
    }
}
