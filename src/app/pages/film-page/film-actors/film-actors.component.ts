import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TuiMapperPipe } from '@taiga-ui/cdk';
import { Cast } from '../../../models';

@Component({
    selector: 'app-film-actors',
    standalone: true,
    imports: [TuiMapperPipe],
    templateUrl: './film-actors.component.html',
    styleUrl: './film-actors.component.less',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilmActorsComponent {
    @Input({ required: true }) actors!: Cast[];

    getTop10(actors: Cast[]): Cast[] {
        return actors.slice(0, 10);
    }
}