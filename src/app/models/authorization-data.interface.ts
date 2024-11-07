// import { Observable } from 'rxjs';

export interface AuthorizationData {
    login: string;
    password: string;
}

export interface FilmData {
    id: string;
    name: string;
    date: string;
    rating: number;
    actors: Actor[];
    synopsis: string;
    poster: string;
}

export interface FilmDataEnriched extends FilmData {
    evaluate: number;
    watched: boolean;
    willWatch: boolean;
}

export interface FiltersData {
    genres: string[];
    dates: string[];
    rating: number[];
    willWatch: boolean;
    watched: boolean;
}

export interface Actor {
    id: string;
    fullname: string;
    url: string;
}

export interface UserInfo {
    email: string;
    registrationDate: string;
}

// interface TmdbApiService {
//     getFilm(id: string): Observable<unknown>;
//     getFilms(filter: FiltersData): Observable<unknown>;

//     addFavorite(id: string): Observable<unknown>;
//     addToWatchlist(id: string): Observable<unknown>;

//     removeFavorite(id: string): Observable<unknown>;
//     removeFromWatchlist(id: string): Observable<unknown>;

//     getFavorites(): Observable<unknown>;
//     getWatchlist(): Observable<unknown>;
// }

// interface JsonServerService {
//     login(login: string, password: string): Observable<boolean>;
//     register(login: string, password: string): Observable<boolean>;

//     getUserInfo(): Observable<UserInfo>;

//     addComment(
//         filmId: string,
//         userId: string,
//         comment: string
//     ): Observable<unknown>;
//     getComments(filmId: string): Observable<unknown>;
// }
