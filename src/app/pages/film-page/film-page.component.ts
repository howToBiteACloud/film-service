import { CommonModule } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    inject,
    OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PosterComponent } from '../../components/poster/poster.component';
import { FilmService } from './film-service/film.service';
import { FilmInfoComponent } from './film-info/film-info.component';
import { FilmActorsComponent } from './film-actors/film-actors.component';

@Component({
    selector: 'app-film-page',
    standalone: true,
    imports: [
        CommonModule,
        FilmInfoComponent,
        PosterComponent,
        FilmActorsComponent,
    ],
    templateUrl: './film-page.component.html',
    styleUrl: './film-page.component.less',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilmPageComponent implements OnInit {
    private readonly filmService = inject(FilmService);
    private readonly activatedRoute = inject(ActivatedRoute);

    readonly filmId = this.activatedRoute.snapshot.paramMap.get('filmId');

    readonly film$ = this.filmService.film$;

    isLoading = true;

    ngOnInit() {
        if (this.filmId) {
            this.filmService.loadFilm(this.filmId);
        }
    }

    onLoad() {
        this.isLoading = false;
    }

    onError() {
        this.isLoading = false;
    }
}
