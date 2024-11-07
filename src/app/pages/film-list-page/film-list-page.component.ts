import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TmdbApiService } from '../../apis/tmdb-api.service';
import { FilmCardsComponent } from './film-cards/film-cards.component';
import { FiltersComponent } from './filters/filters.component';

@Component({
    selector: 'app-film-list-page',
    standalone: true,
    imports: [CommonModule, FilmCardsComponent, FiltersComponent],
    templateUrl: './film-list-page.component.html',
    styleUrl: './film-list-page.component.less',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilmListPageComponent {
    private readonly tmdbApiService = inject(TmdbApiService);
}
