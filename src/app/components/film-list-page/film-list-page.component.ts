import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilmCardsComponent } from '../film-cards/film-cards.component';

@Component({
    selector: 'app-film-list-page',
    standalone: true,
    imports: [CommonModule, FilmCardsComponent],
    templateUrl: './film-list-page.component.html',
    styleUrl: './film-list-page.component.less',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilmListPageComponent {}
