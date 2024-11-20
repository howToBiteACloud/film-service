import { CommonModule } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    inject,
    Input,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { TuiDataList, TuiDropdown, TuiFallbackSrcPipe } from '@taiga-ui/core';
import { TuiAvatar, TuiDataListDropdownManager } from '@taiga-ui/kit';

import { AccountData } from '../../../models';
import { AuthorizationService } from '../../../shared/services/authorization.service';

@Component({
    selector: 'app-account-button',
    standalone: true,
    imports: [
        CommonModule,
        TuiAvatar,
        TuiDropdown,
        TuiFallbackSrcPipe,
        TuiDataListDropdownManager,
        TuiDataList,
        RouterLink,
    ],
    templateUrl: './account-button.component.html',
    styleUrl: './account-button.component.less',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountButtonComponent {
    @Input({ required: true }) account!: AccountData;
    private readonly authorizationService = inject(AuthorizationService);

    protected open = false;

    logout() {
        this.authorizationService.logout();
    }

    close() {
        this.open = false;
    }
}
