import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Genre } from '../models';
import { apiKey } from '../../../environment';

const host = 'https://api.themoviedb.org/3';
const language = 'ru';

@Injectable({
    providedIn: 'root',
})
export class TmdbApiService {
    private readonly httpClient = inject(HttpClient);

    getGenres(): Observable<Genre[]> {
        return this.httpClient
            .get<{ genres: Genre[] }>(host + '/genre/movie/list', {
                params: {
                    language,
                },
                headers: {
                    Authorization: `Bearer ${apiKey}`,
                },
            })
            .pipe(map(({ genres }) => genres));
    }
}
