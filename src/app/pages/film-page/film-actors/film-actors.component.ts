import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TuiMapperPipe } from '@taiga-ui/cdk';

import { Cast } from '../../../models';
import { pluralize } from '../../../shared/utils';

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

    readonly pluralize = pluralize;

    getTop10(actors: Cast[]): Cast[] {
        return actors.slice(0, 10);
    }
}
