import { CommonModule } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    DestroyRef,
    inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TuiFallbackSrcPipe } from '@taiga-ui/core';
import { TuiAvatar, TuiTabs } from '@taiga-ui/kit';
import { TmdbApiService } from 'src/app/apis/tmdb-api.service';

import { AuthorizationService } from '../../shared/services/authorization.service';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [
        CommonModule,
        TuiAvatar,
        TuiFallbackSrcPipe,
        TuiTabs,
        RouterLink,
        RouterLinkActive,
    ],
    templateUrl: './header.component.html',
    styleUrl: './header.component.less',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
    private readonly authorizationService = inject(AuthorizationService);
    private readonly destroyRef = inject(DestroyRef);
    private readonly tmdbApiService = inject(TmdbApiService);

    readonly account$ = this.authorizationService.account$;

    openAuthWindow() {
        this.authorizationService
            .authorize()
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe();
    }
}
