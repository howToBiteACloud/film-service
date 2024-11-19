import { CommonModule } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    inject,
    OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TuiMapperPipe, TuiRepeatTimesPipe } from '@taiga-ui/cdk';
import {
    TuiBreakpointMediaKey,
    TuiBreakpointService,
    TuiButton,
    TuiHint,
    TuiHintDirective,
    TuiIcon,
} from '@taiga-ui/core';
import { TuiSkeleton } from '@taiga-ui/kit';
import { map } from 'rxjs/operators';

import {
    CarouselComponent,
    FilmCardComponent,
    PosterComponent,
} from '../../components';
import { FilmData } from '../../models';
import { AuthorizationService } from '../../shared/services/authorization.service';
import { FilmActorsComponent } from './film-actors/film-actors.component';
import { FilmInfoComponent } from './film-info/film-info.component';
import { FilmService } from './film-service/film.service';
import { FilmTrailerComponent } from './film-trailer/film-trailer.component';

@Component({
    selector: 'app-film-page',
    standalone: true,
    imports: [
        CommonModule,
        FilmInfoComponent,
        PosterComponent,
        FilmActorsComponent,
        FilmTrailerComponent,
        TuiMapperPipe,
        FilmCardComponent,
        TuiSkeleton,
        TuiRepeatTimesPipe,
        CarouselComponent,
        TuiButton,
        TuiIcon,
        TuiHint,
        TuiHintDirective,
    ],
    templateUrl: './film-page.component.html',
    styleUrl: './film-page.component.less',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [FilmService],
})
export class FilmPageComponent implements OnInit {
    private readonly filmService = inject(FilmService);
    private readonly authorizationService = inject(AuthorizationService);
    private readonly activatedRoute = inject(ActivatedRoute);
    private readonly breakpoint$ = inject(TuiBreakpointService);

    readonly visibleItemsCount$ = this.breakpoint$.pipe(
        map((media: TuiBreakpointMediaKey | null) =>
            media === 'mobile' ? 3 : 5,
        ),
    );
    readonly account$ = this.authorizationService.account$;

    readonly filmId$ = this.activatedRoute.paramMap.pipe(
        map((paramMap) => paramMap.get('filmId')),
    );

    readonly film$ = this.filmService.film$;
    readonly isLoading$ = this.filmService.isLoading$;

    ngOnInit() {
        this.filmId$.subscribe((filmId) => {
            if (filmId) {
                this.filmService.loadFilm(filmId);
            }
        });
    }

    getTrailer(film: FilmData) {
        return film.videos.results.find((video) => video.type === 'Trailer');
    }

    getRecommendations(film: FilmData) {
        return film.recommendations.results;
    }

    toggleFavorite(accountId: number, filmId: number, favorite: boolean) {
        this.filmService.changeFavoriteFilm(accountId, filmId, favorite);
    }

    toggleWatchlist(accountId: number, filmId: number, favorite: boolean) {
        this.filmService.changeWatchlistFilm(accountId, filmId, favorite);
    }
}
