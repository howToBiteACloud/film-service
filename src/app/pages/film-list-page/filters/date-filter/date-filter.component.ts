import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
    TuiInputYearModule,
    TuiTextfieldControllerModule,
} from '@taiga-ui/legacy';

@Component({
    selector: 'app-date-filter',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        TuiInputYearModule,
        TuiTextfieldControllerModule,
    ],
    templateUrl: './date-filter.component.html',
    styleUrl: './date-filter.component.less',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateFilterComponent {
    @Input() control!: FormControl;
}
