import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Cast } from '../../../models';

@Component({
    selector: 'app-film-actors',
    standalone: true,
    templateUrl: './film-actors.component.html',
    styleUrl: './film-actors.component.less',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilmActorsComponent {
    @Input({ required: true }) actors!: Cast[];
}
