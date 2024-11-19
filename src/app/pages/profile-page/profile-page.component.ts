import { CommonModule } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    inject,
    OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { TuiFallbackSrcPipe } from '@taiga-ui/core';
import { TuiAvatar, TuiSkeleton } from '@taiga-ui/kit';
import { filter } from 'rxjs/operators';

import { FilmCardsComponent } from '../../components/film-cards/film-cards.component';
import { AuthorizationService } from './../../shared/services/authorization.service';
import { FavoriteFilmsService } from './services/favorite-films.service';
import { RatedFilmsService } from './services/rated-films.service';
import { WatchListFilmsService } from './services/watch-list-films.service';

@Component({
    selector: 'app-profile-page',
    standalone: true,
    imports: [
        CommonModule,
        TuiSkeleton,
        TuiAvatar,
        TuiFallbackSrcPipe,
        FilmCardsComponent,
    ],
    templateUrl: './profile-page.component.html',
    styleUrl: './profile-page.component.less',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [FavoriteFilmsService, WatchListFilmsService, RatedFilmsService],
})
export class ProfilePageComponent implements OnInit {
    private readonly authorizationService = inject(AuthorizationService);
    private readonly favoriteFilmsService = inject(FavoriteFilmsService);
    private readonly watchListFilmsService = inject(WatchListFilmsService);
    private readonly router = inject(Router);

    readonly account$ = this.authorizationService.account$;
    readonly accountLoading$ = this.authorizationService.accountLoading$;
    readonly favoriteFilms$ = this.favoriteFilmsService.favoriteFilms$;
    readonly watchList$ = this.watchListFilmsService.watchList$;
    readonly watchListTotalPages$ = this.watchListFilmsService.totalPages$;
    readonly favoriteTotalPages$ = this.favoriteFilmsService.totalPages$;
    readonly isLoadingFavorites$ = this.favoriteFilmsService.isLoading$;
    readonly isLoadingWathList$ = this.watchListFilmsService.isLoading$;

    ngOnInit() {
        this.favoriteFilmsService.initialize();
        this.watchListFilmsService.initialize();

        this.account$
            .pipe(
                filter((account) => {
                    return !account;
                }),
            )
            .subscribe(() => this.router.navigate(['/']));
    }

    onWatchlistPageChanged(pageNumber: number) {
        this.watchListFilmsService.pageChange(pageNumber);
    }

    onFavoritePageChanged(pageNumber: number) {
        this.favoriteFilmsService.pageChange(pageNumber);
    }
}
