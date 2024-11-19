import { CommonModule } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    inject,
    Input,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TuiButton, TuiHint, TuiHintDirective, TuiIcon } from '@taiga-ui/core';
import { TuiRating } from '@taiga-ui/kit';

import { AccountData, FilmData } from '../../../models';
import { FilmService } from '../film-service/film.service';

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
    private readonly filmService = inject(FilmService);

    @Input({ required: true }) film!: FilmData;
    @Input({ required: true }) account!: AccountData;

    toggleFavorite(accountId: number, filmId: number, favorite: boolean) {
        this.filmService.changeFavoriteFilm(accountId, filmId, favorite);
    }

    toggleWatchlist(accountId: number, filmId: number, watchList: boolean) {
        this.filmService.changeWatchlistFilm(accountId, filmId, watchList);
    }

    changeFilmRate(rate: number, filmId: number) {
        this.filmService.changeFilmRate(rate, filmId);
    }

    deleteFilmRate(filmId: number) {
        this.filmService.deleteFilmRate(filmId);
    }
}
