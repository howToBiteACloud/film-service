import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TuiAppearance, TuiSurface } from '@taiga-ui/core';
import { TuiTiles } from '@taiga-ui/kit';

@Component({
    selector: 'app-film-cards',
    standalone: true,
    imports: [CommonModule, TuiAppearance, TuiSurface, TuiTiles],
    templateUrl: './film-cards.component.html',
    styleUrl: './film-cards.component.less',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilmCardsComponent {
    protected order = new Map();
}
