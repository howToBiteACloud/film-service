// import { Observable } from 'rxjs';

export interface AuthorizationData {
    login: string;
    password: string;
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
