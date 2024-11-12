import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TuiPagination } from '@taiga-ui/kit';
import { TuiTextfieldControllerModule } from '@taiga-ui/legacy';
import { TuiSkeleton } from '@taiga-ui/kit';
import { TuiRepeatTimesPipe } from '@taiga-ui/cdk';
import { FilmService } from '../film-service/film.service';
import { FilmCardComponent } from './film-card/film-card.component';

@Component({
    selector: 'app-film-cards',
    standalone: true,
    imports: [
        CommonModule,
        FilmCardComponent,
        TuiPagination,
        TuiTextfieldControllerModule,
        TuiSkeleton,
        TuiRepeatTimesPipe,
    ],
    templateUrl: './film-cards.component.html',
    styleUrl: './film-cards.component.less',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilmCardsComponent {
    private readonly filmService = inject(FilmService);
    readonly films$ = this.filmService.films$;
    readonly totalPages$ = this.filmService.totalPages$;
    readonly isLoading$ = this.filmService.isLoading$;

    index = 0;

    protected pageChanged(index: number): void {
        this.index = index;
        this.filmService.pageChange(index + 1);
    }
}
