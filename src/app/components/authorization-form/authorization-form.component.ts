import {
    ChangeDetectionStrategy,
    Component,
    inject,
    OnInit,
} from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import {
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    Validators,
    AbstractControl,
    ValidatorFn,
} from '@angular/forms';
import {
    tuiMarkControlAsTouchedAndValidate,
    TuiValidationError,
} from '@taiga-ui/cdk';
import { TuiButton, TuiError } from '@taiga-ui/core';
import { TuiFieldErrorPipe } from '@taiga-ui/kit';
import {
    TuiInputModule,
    TuiInputPasswordModule,
    TuiTextfieldControllerModule,
} from '@taiga-ui/legacy';

function requiredValidator(
    control: AbstractControl
): TuiValidationError | null {
    return Validators.required(control)
        ? new TuiValidationError('Это поле должно быть заполнено')
        : null;
}

function minLengthValidator(minLength: number): ValidatorFn {
    return (control: AbstractControl): TuiValidationError | null => {
        return Validators.minLength(minLength)(control)
            ? new TuiValidationError(
                  `Это поле не может содержать менее ${minLength} символов`
              )
            : null;
    };
}

@Component({
    selector: 'app-authorization-form',
    standalone: true,
    imports: [
        CommonModule,
        AsyncPipe,
        ReactiveFormsModule,
        TuiError,
        TuiFieldErrorPipe,
        TuiInputModule,
        TuiInputPasswordModule,
        TuiTextfieldControllerModule,
        TuiButton,
    ],
    templateUrl: './authorization-form.component.html',
    styleUrl: './authorization-form.component.less',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthorizationFormComponent {
    private readonly formBuilder = inject(FormBuilder);

    readonly array = [Validators.required, Validators.minLength(4)];

    authorizationForm: FormGroup = this.formBuilder.group({
        username: ['', [requiredValidator, minLengthValidator(4)]],
        password: ['', [requiredValidator, minLengthValidator(5)]],
    });

    onSubmit() {
        if (this.authorizationForm.invalid) {
            tuiMarkControlAsTouchedAndValidate(this.authorizationForm);
            return;
        }
    }
}
