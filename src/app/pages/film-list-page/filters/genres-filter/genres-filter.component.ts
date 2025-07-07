import { CommonModule } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    inject,
    Input,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { tuiPure } from '@taiga-ui/cdk';
import { TuiDataList } from '@taiga-ui/core';
import { TuiDataListWrapper, TuiStringifyContentPipe } from '@taiga-ui/kit';
import {
    TuiMultiSelectModule,
    TuiTextfieldControllerModule,
} from '@taiga-ui/legacy';

import { Genre } from '../../../../models';
import { selectFilmList } from '../../store/film-list.selectors';

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
    private readonly store = inject(Store);

    protected readonly genres$ = this.store.select(selectFilmList.genres);

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
