import {
    ChangeDetectionStrategy,
    Component,
    inject,
    Input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { map } from 'rxjs/operators';
import { TuiBadge } from '@taiga-ui/kit';
import { TuiMapperPipe } from '@taiga-ui/cdk';
import { TuiAmountPipe } from '@taiga-ui/addon-commerce';
import { FilmData, ProductionCountry } from '../../../models';
import { FilmService } from '../film-service/film.service';

@Component({
    selector: 'app-film-info',
    standalone: true,
    imports: [CommonModule, TuiBadge, TuiMapperPipe, TuiAmountPipe],
    templateUrl: './film-info.component.html',
    styleUrl: './film-info.component.less',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilmInfoComponent {
    @Input({ required: true }) film!: FilmData;

    readonly getCountries = (countries: ProductionCountry[]) =>
        countries.map((country) => country.name);

    getDirectorName(film: FilmData): string {
        const director = film.credits.crew.find(
            (person) => person.job === 'Director'
        );

        return director?.name ?? '';
    }
}
