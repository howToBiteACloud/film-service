import { CommonModule } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    inject,
    Input,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { tuiPure } from '@taiga-ui/cdk';
import { TuiDataList } from '@taiga-ui/core';
import { TuiDataListWrapper, TuiStringifyContentPipe } from '@taiga-ui/kit';
import {
    TuiMultiSelectModule,
    TuiTextfieldControllerModule,
} from '@taiga-ui/legacy';

import { Genre } from '../../../../models';
import { FilmListService } from '../../services/film-list.service';

@Component({
    selector: 'app-genres-filter',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        TuiDataList,
        TuiDataListWrapper,
        TuiMultiSelectModule,
        TuiTextfieldControllerModule,
        TuiStringifyContentPipe,
    ],
    templateUrl: './genres-filter.component.html',
    styleUrl: './genres-filter.component.less',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GenresFilterComponent {
    private readonly filmListService = inject(FilmListService);
    protected readonly genres$ = this.filmListService.genres$;

    protected readonly stringify = (item: Genre): string => item.name;

    protected search: string | null = '';

    @Input() control!: FormControl;

    @tuiPure
    protected filter(search: string | null, genres: Genre[]): readonly Genre[] {
        return genres.filter((item: Genre) =>
            search ? item.name.includes(search) : true,
        );
    }
}
