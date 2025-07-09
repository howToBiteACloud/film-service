import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TuiLabel } from '@taiga-ui/core';
import { TuiRadio } from '@taiga-ui/kit';
import { SortingFilmList } from 'src/app/models';

@Component({
    selector: 'app-sorting',
    standalone: true,
    imports: [CommonModule, TuiLabel, TuiRadio, ReactiveFormsModule],
    templateUrl: './sorting.component.html',
    styleUrl: './sorting.component.less',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SortingComponent {
    public readonly sortingFilmList = SortingFilmList;

    @Input() control!: FormControl;
}
