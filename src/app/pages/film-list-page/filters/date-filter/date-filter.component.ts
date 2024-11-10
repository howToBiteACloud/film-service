import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
    TuiInputYearModule,
    TuiTextfieldControllerModule,
} from '@taiga-ui/legacy';

@Component({
    selector: 'app-date-filter',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        TuiInputYearModule,
        TuiTextfieldControllerModule,
    ],
    templateUrl: './date-filter.component.html',
    styleUrl: './date-filter.component.less',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateFilterComponent {
    // protected readonly control = new FormControl<number | null>(null);

    @Input() control!: FormControl;
}
