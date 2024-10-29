import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TuiAppearance, TuiSurface } from '@taiga-ui/core';

@Component({
    selector: 'app-film-cards',
    standalone: true,
    imports: [CommonModule, TuiAppearance, TuiSurface],
    templateUrl: './film-cards.component.html',
    styleUrl: './film-cards.component.less',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilmCardsComponent {}
