import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TuiDataList } from '@taiga-ui/core';
import { TuiDataListWrapper, TuiStringifyContentPipe } from '@taiga-ui/kit';
import {
    TuiMultiSelectModule,
    TuiTextfieldControllerModule,
} from '@taiga-ui/legacy';
import { TUI_DEFAULT_MATCHER, tuiPure } from '@taiga-ui/cdk';
import { TmdbApiService } from 'src/app/apis/tmdb-api.service';
import { Genre } from 'src/app/models';

// const DATES: readonly string[] = [
//     '1990',
//     '1991',
//     '1992',
//     '1993',
//     '1994',
//     '1995',
//     '1996',
//     '1997',
//     '1998',
//     '1999',
//     '2000',
//     '2001',
//     '2002',
//     '2003',
//     '2004',
//     '2005',
//     '2006',
//     '2007',
//     '2008',
//     '2009',
//     '2010',
//     '2011',
//     '2012',
//     '2013',
//     '2014',
//     '2015',
//     '2016',
//     '2017',
//     '2018',
//     '2019',
//     '2020',
//     '2021',
//     '2022',
//     '2023',
//     '2024',
// ];

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
    private readonly tmdbApiService = inject(TmdbApiService);
    protected readonly genres$ = this.tmdbApiService.getGenres();

    protected search: string | null = '';

    protected readonly control = new FormControl([]);

    protected readonly stringify = (item: Genre): string => item.name;

    @tuiPure
    protected filter(search: string | null, genres: Genre[]): readonly Genre[] {
        return genres.filter((item) => TUI_DEFAULT_MATCHER(item, search || ''));
    }
}
