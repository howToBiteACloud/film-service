import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-authorization-page',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './authorization-page.component.html',
    styleUrl: './authorization-page.component.less',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthorizationPageComponent {}
