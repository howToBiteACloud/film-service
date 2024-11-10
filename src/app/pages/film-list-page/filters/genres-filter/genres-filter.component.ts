import {
    ChangeDetectionStrategy,
    Component,
    inject,
    Input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TuiDataList } from '@taiga-ui/core';
import { TuiDataListWrapper, TuiStringifyContentPipe } from '@taiga-ui/kit';
import {
    TuiMultiSelectModule,
    TuiTextfieldControllerModule,
} from '@taiga-ui/legacy';
import { TUI_DEFAULT_MATCHER, tuiPure } from '@taiga-ui/cdk';
import { Genre } from '../../../../models';
import { FilmService } from '../../film-service/film.service';

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
    private readonly filmService = inject(FilmService);
    protected readonly genres$ = this.filmService.genres$;

    // protected readonly control = new FormControl([]);

    protected readonly stringify = (item: Genre): string => item.name;

    protected search: string | null = '';

    @Input() control!: FormControl;

    @tuiPure
    protected filter(search: string | null, genres: Genre[]): readonly Genre[] {
        return genres.filter((item) => TUI_DEFAULT_MATCHER(item, search || ''));
    }
}
