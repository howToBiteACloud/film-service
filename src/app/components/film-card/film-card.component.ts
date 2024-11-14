import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TuiLineClamp } from '@taiga-ui/kit';

import { CommonFilmData } from '../../models';
import { PosterComponent } from '..';

@Component({
    selector: 'app-film-card',
    standalone: true,
    imports: [TuiLineClamp, RouterLink, PosterComponent],
    templateUrl: './film-card.component.html',
    styleUrl: './film-card.component.less',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilmCardComponent {
    @Input({ required: true }) data!: CommonFilmData;

    isLoading = true;

    onLoad() {
        this.isLoading = false;
    }

    onError() {
        this.isLoading = false;
    }
}
