import { CommonModule } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    inject,
    Input,
    Output,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { TuiRepeatTimesPipe } from '@taiga-ui/cdk';
import { TuiPagination } from '@taiga-ui/kit';
import { TuiSkeleton } from '@taiga-ui/kit';
import { TuiTextfieldControllerModule } from '@taiga-ui/legacy';
import { FilmData } from 'src/app/models';

import { FilmCardComponent } from '../film-card/film-card.component';

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
    private readonly store = inject(Store);
    @Input({ required: true }) films: FilmData[] = [];
    @Input({ required: true }) totalPages = 0;
    @Input() isLoading = false;

    @Output() pageChanged = new EventEmitter<number>();

    index = 0;

    protected onPageChanged(index: number): void {
        this.index = index;
        this.pageChanged.emit(index + 1);
    }
}
