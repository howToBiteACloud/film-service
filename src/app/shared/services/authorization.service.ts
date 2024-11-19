import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, interval, Observable, of } from 'rxjs';
import {
    catchError,
    filter,
    shareReplay,
    switchMap,
    takeWhile,
    tap,
} from 'rxjs/operators';

import { TmdbApiService } from '../../apis/tmdb-api.service';
import { EncryptionService } from './encryption.service';

@Injectable({
    providedIn: 'root',
})
export class AuthorizationService {
    private readonly tmdbApiService = inject(TmdbApiService);
    private readonly encryptionService = inject(EncryptionService);

    private readonly sessionIdKey = 'sessionId';

    readonly accountLoading$ = new BehaviorSubject<boolean>(false);

    readonly sessionId$ = new BehaviorSubject(this.getSessionId());
    readonly account$ = this.sessionId$.pipe(
        tap(() => this.accountLoading$.next(true)),
        switchMap((sessionId) => {
            return sessionId
                ? this.tmdbApiService.getAccount(sessionId)
                : of(null);
        }),
        catchError(() => {
            this.logout();
            return of(null);
        }),
        tap(() => {
            this.accountLoading$.next(false);
        }),
        shareReplay({
            refCount: true,
            bufferSize: 1,
        }),
    );

    getSessionId(): string | null {
        const encriptedData = localStorage.getItem(this.sessionIdKey);

        return encriptedData && this.encryptionService.decrypt(encriptedData);
    }

    authorize(): Observable<string> {
        return this.tmdbApiService.getRequestToken().pipe(
            switchMap(({ request_token }) => {
                const openedWindow = window.open(
                    `https://www.themoviedb.org/authenticate/${request_token}`,
                    '_blank',
                    'width=800,height=600',
                );

                return interval(500).pipe(
                    takeWhile(() => !openedWindow?.closed, true),
                    filter(() => Boolean(openedWindow?.closed)),
                    switchMap(() =>
                        this.tmdbApiService.createSession(request_token),
                    ),
                );
            }),
            tap((sessionId) => {
                this.setSessionId(sessionId);
            }),
        );
    }

    logout() {
        localStorage.removeItem(this.sessionIdKey);
        this.sessionId$.next(null);
    }

    private setSessionId(sessionId: string) {
        const encriptedData = this.encryptionService.encrypt(sessionId);

        localStorage.setItem(this.sessionIdKey, encriptedData);
        this.sessionId$.next(sessionId);
    }
}
