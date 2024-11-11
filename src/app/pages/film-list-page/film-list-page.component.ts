import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FilmCardsComponent } from './film-cards/film-cards.component';
import { FiltersComponent } from './filters/filters.component';
import { FilmService } from './film-service/film.service';

@Component({
    selector: 'app-film-list-page',
    standalone: true,
    imports: [FilmCardsComponent, FiltersComponent],
    templateUrl: './film-list-page.component.html',
    styleUrl: './film-list-page.component.less',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [FilmService],
})
export class FilmListPageComponent {}
