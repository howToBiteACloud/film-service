import {
    ChangeDetectionStrategy,
    Component,
    inject,
    OnInit,
} from '@angular/core';

import { FilmCardsComponent } from './film-cards/film-cards.component';
import { FilmListService } from './film-list-service/film-list.service';
import { FiltersComponent } from './filters/filters.component';

@Component({
    selector: 'app-film-list-page',
    standalone: true,
    imports: [FilmCardsComponent, FiltersComponent],
    templateUrl: './film-list-page.component.html',
    styleUrl: './film-list-page.component.less',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [FilmListService],
})
export class FilmListPageComponent implements OnInit {
    private readonly filmListService = inject(FilmListService);

    ngOnInit() {
        this.filmListService.initialize();
    }
}
