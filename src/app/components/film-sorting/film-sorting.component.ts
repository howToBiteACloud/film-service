import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TuiDataList } from '@taiga-ui/core';
import { TuiDataListWrapper } from '@taiga-ui/kit';
import {
    TuiMultiSelectModule,
    TuiTextfieldControllerModule,
} from '@taiga-ui/legacy';
import { TUI_DEFAULT_MATCHER, tuiPure } from '@taiga-ui/cdk';

const ITEMS: readonly string[] = [
    'Комедия',
    'Мелодрама',
    'Триллер',
    'Ужасы',
    'Фантастика',
    'Фэнтези',
];

@Component({
    selector: 'app-film-sorting',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        TuiDataList,
        TuiDataListWrapper,
        TuiMultiSelectModule,
        TuiTextfieldControllerModule,
    ],
    templateUrl: './film-sorting.component.html',
    styleUrl: './film-sorting.component.less',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilmSortingComponent {
    protected search: string | null = '';

    protected readonly control = new FormControl([ITEMS[0]]);

    @tuiPure
    protected filter(search: string | null): readonly string[] {
        return ITEMS.filter((item) => TUI_DEFAULT_MATCHER(item, search || ''));
    }
}
