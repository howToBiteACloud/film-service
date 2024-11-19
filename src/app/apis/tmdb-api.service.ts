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

    getFilm(filmId: string, session_id: string | null): Observable<FilmData> {
        const params: Record<string, string> = {
            language,
            append_to_response: 'credits,videos,recommendations,lists',
        };

        if (session_id) {
            params['session_id'] = session_id;
            params['append_to_response'] += ',account_states';
        }

        return this.httpClient.get<FilmData>(host + `/movie/${filmId}`, {
            params: {
                ...params,
                language,
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

    getWatchList(
        page: number,
        accountId: number,
        session_id: string,
    ): Observable<FilmsResponse> {
        return this.httpClient.get<FilmsResponse>(
            host + `/account/${accountId}/watchlist/movies`,
            {
                params: {
                    page,
                    language,
                    session_id,
                },
            },
        );
    }

    getRatedFilms(
        page: number,
        accountId: number,
        session_id: string,
    ): Observable<FilmsResponse> {
        return this.httpClient.get<FilmsResponse>(
            host + `/account/${accountId}/rated/movies`,
            {
                params: {
                    page,
                    language,
                    session_id,
                },
            },
        );
    }

    getFavoriteFilms(
        page: number,
        accountId: number,
        session_id: string,
    ): Observable<FilmsResponse> {
        return this.httpClient.get<FilmsResponse>(
            host + `/account/${accountId}/favorite/movies`,
            {
                params: {
                    page,
                    language,
                    session_id,
                },
            },
        );
    }

    changeFavoriteFilm(
        accountId: number,
        filmId: number,
        favorite: boolean,
        session_id: string,
    ) {
        return this.httpClient.post<FilmData>(
            host + `/account/${accountId}/favorite`,
            {
                media_type: 'movie',
                media_id: filmId,
                favorite,
            },
            {
                params: {
                    language,
                    session_id,
                },
            },
        );
    }

    changeWatchListFilm(
        accountId: number,
        filmId: number,
        watchlist: boolean,
        session_id: string,
    ) {
        return this.httpClient.post<FilmData>(
            host + `/account/${accountId}/watchlist`,
            {
                media_type: 'movie',
                media_id: filmId,
                watchlist,
            },
            {
                params: {
                    language,
                    session_id,
                },
            },
        );
    }

    changeFilmRate(rate: number, filmId: number, session_id: string) {
        return this.httpClient.post<FilmData>(
            host + `/movie/${filmId}/rating`,
            { value: rate },
            {
                params: {
                    language,
                    session_id,
                },
            },
        );
    }

    deleteFilmRate(filmId: number, session_id: string) {
        return this.httpClient.delete<FilmData>(
            host + `/movie/${filmId}/rating`,
            {
                params: {
                    session_id,
                },
            },
        );
    }

    getFilmsByName(value: string): Observable<FilmsResponse> {
        return this.httpClient.get<FilmsResponse>(host + '/search/movie', {
            params: {
                page: 1,
                language,
                query: value,
            },
        });
    }
}
