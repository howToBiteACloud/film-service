import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TuiAmountPipe } from '@taiga-ui/addon-commerce';
import { TuiMapperPipe } from '@taiga-ui/cdk';
import { TuiBadge } from '@taiga-ui/kit';

import { FilmData, ProductionCountry } from '../../../models';
import { getTimeFromMins } from '../../../shared/utils';

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
        countries.map((country) => country.name).join(', ');

    readonly getFixedAverageVote = (film: FilmData) =>
        film.vote_average.toFixed(1);

    readonly getFixedRuntime = (film: FilmData) =>
        getTimeFromMins(film.runtime);

    getDirectorName(film: FilmData): string {
        const director = film.credits.crew.find(
            (person) => person.job === 'Director',
        );

        return director?.name ?? '';
    }
}
