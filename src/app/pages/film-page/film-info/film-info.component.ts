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
import { FilmData, Genre, ProductionCountry } from '../../../models';
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

    private readonly filmService = inject(FilmService);

    readonly film$ = this.filmService.film$;

    readonly info$ = this.film$.pipe(
        map((filmData) => {
            const genres = filmData?.genres.map((genre) => ' ' + genre.name);
            const countries = filmData?.production_countries.map(
                (country) => country.name
            );
            const director = filmData?.credits.crew.find(
                (person) => person.job === 'Director'
            )?.name;
            const actors = filmData?.credits.cast.map((person) => {
                person.name, person.character;
            });
            return {
                genres,
                countries,
                director,
                actors,
            };
        })
    );
}
