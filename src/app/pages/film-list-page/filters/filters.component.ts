import {
    ChangeDetectionStrategy,
    Component,
    inject,
    OnInit,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Genre } from '../../../models';
import { FilmService } from '../film-service/film.service';
import { GenresFilterComponent } from './genres-filter/genres-filter.component';
import { DateFilterComponent } from './date-filter/date-filter.component';

@Component({
    selector: 'app-filters',
    standalone: true,
    imports: [GenresFilterComponent, DateFilterComponent],
    templateUrl: './filters.component.html',
    styleUrl: './filters.component.less',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FiltersComponent implements OnInit {
    private readonly filmService = inject(FilmService);

    readonly genresControl = new FormControl<Genre[]>([]);
    readonly datesControl = new FormControl<number | null>(null);
    readonly filtersForm: FormGroup = new FormGroup({
        genres: this.genresControl,
        dates: this.datesControl,
    });

    ngOnInit() {
        this.filtersForm.valueChanges.subscribe((value) => {
            this.filmService.controlsChange(value);
        });
    }
}
