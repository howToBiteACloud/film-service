import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TuiRepeatTimesPipe } from '@taiga-ui/cdk';
import { TuiPagination } from '@taiga-ui/kit';
import { TuiSkeleton } from '@taiga-ui/kit';
import { TuiTextfieldControllerModule } from '@taiga-ui/legacy';

import { FilmCardComponent } from '../../../components/film-card/film-card.component';
import { FilmListService } from '../film-list-service/film-list.service';

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
    private readonly filmListService = inject(FilmListService);
    readonly films$ = this.filmListService.films$;
    readonly totalPages$ = this.filmListService.totalPages$;
    readonly isLoading$ = this.filmListService.isLoading$;

    index = 0;

    protected pageChanged(index: number): void {
        this.index = index;
        this.filmListService.pageChange(index + 1);
    }
}
