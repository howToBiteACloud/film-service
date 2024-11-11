import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TuiLineClamp, TuiSkeleton } from '@taiga-ui/kit';
import { FilmData } from '../../../../models';

@Component({
    selector: 'app-film-card',
    standalone: true,
    imports: [TuiSkeleton, TuiLineClamp],
    templateUrl: './film-card.component.html',
    styleUrl: './film-card.component.less',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilmCardComponent {
    @Input({ required: true }) data!: FilmData;

    isLoading = true;

    onLoad() {
        this.isLoading = false;
    }

    onError() {
        this.isLoading = false;
    }
}
