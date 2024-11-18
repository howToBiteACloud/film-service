import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {
    AccountData,
    DiscoverMovieParams,
    FilmData,
    FilmsResponse,
    Genre,
    RequestToken,
} from '../models';

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
            })
            .pipe(map(({ genres }) => genres));
    }

    getFilms(params: DiscoverMovieParams): Observable<FilmsResponse> {
        return this.httpClient.get<FilmsResponse>(host + '/discover/movie', {
            params: {
                language,
                ...params,
            },
        });
    }

    getFilm(filmId: string): Observable<FilmData> {
        return this.httpClient.get<FilmData>(host + `/movie/${filmId}`, {
            params: {
                language,
                append_to_response: 'credits,videos,recommendations',
            },
        });
    }

    getRequestToken(): Observable<RequestToken> {
        return this.httpClient.get<RequestToken>(
            host + '/authentication/token/new',
        );
    }

    createSession(requestToken: string): Observable<string> {
        return this.httpClient
            .post<{ session_id: string }>(
                host + '/authentication/session/new',
                {
                    request_token: requestToken,
                },
            )
            .pipe(map(({ session_id }) => session_id));
    }

    getAccount(session_id: string): Observable<AccountData> {
        return this.httpClient.get<AccountData>(host + '/account', {
            params: { session_id },
        });
    }
}
