import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenresFilterComponent } from './genres-filter/genres-filter.component';

@Component({
    selector: 'app-filters',
    standalone: true,
    imports: [CommonModule, GenresFilterComponent],
    templateUrl: './filters.component.html',
    styleUrl: './filters.component.less',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FiltersComponent {}
