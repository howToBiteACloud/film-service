import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilmData } from '../../../../models';

@Component({
    selector: 'app-film-card',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './film-card.component.html',
    styleUrl: './film-card.component.less',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilmCardComponent {
    @Input({ required: true }) data!: FilmData;
}
