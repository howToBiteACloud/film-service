import { CommonModule } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    inject,
    OnInit,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TuiActiveZone } from '@taiga-ui/cdk';
import { TuiDropdown, TuiLoader } from '@taiga-ui/core';
import { TuiInputModule, TuiTextfieldControllerModule } from '@taiga-ui/legacy';

import { PosterComponent } from '../../poster/poster.component';
import { FilmSearchService } from './film-search.service';

@Component({
    selector: 'app-film-search',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        TuiInputModule,
        TuiTextfieldControllerModule,
        TuiDropdown,
        PosterComponent,
        RouterLink,
        TuiActiveZone,
        TuiLoader,
    ],
    templateUrl: './film-search.component.html',
    styleUrl: './film-search.component.less',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [FilmSearchService],
})
export class FilmSearchComponent implements OnInit {
    private readonly filmSearchService = inject(FilmSearchService);

    readonly control = this.filmSearchService.searchControl;
    readonly films$ = this.filmSearchService.films$;
    readonly isLoading$ = this.filmSearchService.isLoading$;

    inActiveZone = false;

    get value(): string {
        return this.control.value ?? '';
    }

    get open(): boolean {
        return this.value.length >= 3 && this.inActiveZone;
    }

    ngOnInit() {
        this.filmSearchService.initialize();
    }

    onActiveZone(active: boolean) {
        this.inActiveZone = active;
    }

    onClickItem() {
        this.control.setValue('');
    }
}
