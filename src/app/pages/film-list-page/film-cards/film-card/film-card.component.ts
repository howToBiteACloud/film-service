import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TuiAppearance, TuiSurface } from '@taiga-ui/core';
import { TuiTiles } from '@taiga-ui/kit';

@Component({
    selector: 'app-film-card',
    standalone: true,
    imports: [CommonModule, TuiAppearance, TuiSurface, TuiTiles],
    templateUrl: './film-card.component.html',
    styleUrl: './film-card.component.less',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilmCardComponent {}
