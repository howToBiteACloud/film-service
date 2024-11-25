import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TuiChip, TuiLineClamp } from '@taiga-ui/kit';

import { CommonFilmData } from '../../models';
import { PosterComponent } from '..';

@Component({
    selector: 'app-film-card',
    standalone: true,
    imports: [TuiLineClamp, RouterLink, PosterComponent, TuiChip],
    templateUrl: './film-card.component.html',
    styleUrl: './film-card.component.less',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilmCardComponent {
    @Input({ required: true }) data!: CommonFilmData;
}
