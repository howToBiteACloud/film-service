import {
    ChangeDetectionStrategy,
    Component,
    inject,
    OnInit,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { Genre } from '../../../models';
import { FilmListService } from '../services/film-list.service';
import { DateFilterComponent } from './date-filter/date-filter.component';
import { GenresFilterComponent } from './genres-filter/genres-filter.component';
import { SortingComponent } from './sorting/sorting.component';

@Component({
    selector: 'app-filters',
    standalone: true,
    imports: [GenresFilterComponent, DateFilterComponent, SortingComponent],
    templateUrl: './filters.component.html',
    styleUrl: './filters.component.less',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FiltersComponent implements OnInit {
    private readonly filmListService = inject(FilmListService);

    readonly genresControl = new FormControl<Genre[]>([]);
    readonly datesControl = new FormControl<number | null>(null);
    readonly sortControl = new FormControl<string>('popularity.desc');
    readonly filtersForm: FormGroup = new FormGroup({
        genres: this.genresControl,
        dates: this.datesControl,
        sorting: this.sortControl,
    });

    ngOnInit() {
        this.filtersForm.valueChanges.subscribe((value) => {
            this.filmListService.controlsChange(value);
        });
    }
}
