import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TuiMapperPipe } from '@taiga-ui/cdk';
import { TuiLink } from '@taiga-ui/core';

import { Cast } from '../../../models';
import { pluralize } from '../../../shared/utils';

@Component({
    selector: 'app-film-actors',
    standalone: true,
    imports: [TuiMapperPipe, TuiLink],
    templateUrl: './film-actors.component.html',
    styleUrl: './film-actors.component.less',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilmActorsComponent {
    @Input({ required: true }) actors!: Cast[];

    readonly pluralActorsMapping = {
        '=0': 'актеров',
        '=1': 'актер',
        other: 'актера',
    };
    readonly pluralize = pluralize;

    getTop10(actors: Cast[]): Cast[] {
        return actors.slice(0, 10);
    }
}
