import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilmCardComponent } from './film-card/film-card.component';

@Component({
    selector: 'app-film-cards',
    standalone: true,
    imports: [CommonModule, FilmCardComponent],
    templateUrl: './film-cards.component.html',
    styleUrl: './film-cards.component.less',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilmCardsComponent {
    protected order = new Map();
}
