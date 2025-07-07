import { CommonModule } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    inject,
    OnDestroy,
    OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { TuiMapperPipe, TuiRepeatTimesPipe } from '@taiga-ui/cdk';
import { TuiBreakpointMediaKey, TuiBreakpointService } from '@taiga-ui/core';
import { TuiSkeleton } from '@taiga-ui/kit';
import { map } from 'rxjs/operators';

import {
    CarouselComponent,
    FilmCardComponent,
    PosterComponent,
} from '../../components';
import { FilmData } from '../../models';
import { AuthorizationService } from '../../shared/services/authorization.service';
import { FilmActionsComponent } from './film-actions/film-actions.component';
import { FilmActorsComponent } from './film-actors/film-actors.component';
import { FilmInfoComponent } from './film-info/film-info.component';
import { FilmTrailerComponent } from './film-trailer/film-trailer.component';
import { filmActions } from './store/film.actions';
import { selectFilm } from './store/film.selectors';

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
        FilmActionsComponent,
    ],
    templateUrl: './film-page.component.html',
    styleUrl: './film-page.component.less',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilmPageComponent implements OnInit, OnDestroy {
    private readonly authorizationService = inject(AuthorizationService);
    private readonly activatedRoute = inject(ActivatedRoute);
    private readonly breakpoint$ = inject(TuiBreakpointService);
    private readonly store = inject(Store);

    protected readonly visibleItemsCount$ = this.breakpoint$.pipe(
        map((media: TuiBreakpointMediaKey | null) =>
            media === 'mobile' ? 3.3 : 5,
        ),
    );
    protected readonly account$ = this.authorizationService.account$;

    protected readonly filmId$ = this.activatedRoute.paramMap.pipe(
        map((paramMap) => paramMap.get('filmId')),
    );

    protected readonly film$ = this.store.select(selectFilm);

    ngOnInit() {
        this.filmId$.subscribe((filmId) => {
            if (filmId) {
                this.store.dispatch(filmActions.load({ filmId }));
            }
        });
    }

    getTrailer(film: FilmData) {
        return film.videos.results.find((video) => video.type === 'Trailer');
    }

    getRecommendations(film: FilmData) {
        return film.recommendations.results;
    }

    ngOnDestroy() {
        this.store.dispatch(filmActions.closed());
    }
}
