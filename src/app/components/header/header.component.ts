import { CommonModule } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    DestroyRef,
    inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { TuiButton } from '@taiga-ui/core';
import { TuiAvatar, TuiSkeleton } from '@taiga-ui/kit';

import { AuthorizationService } from '../../shared/services/authorization.service';
import { AccountButtonComponent } from './account-button/account-button.component';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [
        CommonModule,
        RouterLink,
        AccountButtonComponent,
        TuiButton,
        TuiSkeleton,
        TuiAvatar,
    ],
    templateUrl: './header.component.html',
    styleUrl: './header.component.less',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
    private readonly authorizationService = inject(AuthorizationService);
    private readonly destroyRef = inject(DestroyRef);

    readonly account$ = this.authorizationService.account$;
    readonly accountLoading$ = this.authorizationService.accountLoading$;

    openAuthWindow() {
        this.authorizationService
            .authorize()
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe();
    }
}
