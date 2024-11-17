import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, interval, Observable, of } from 'rxjs';
import { filter, switchMap, takeWhile, tap } from 'rxjs/operators';

import { EncryptionService } from '../../apis/encryption.service';
import { TmdbApiService } from '../../apis/tmdb-api.service';

@Injectable({
    providedIn: 'root',
})
export class AuthorizationService {
    private readonly tmdbApiService = inject(TmdbApiService);
    private readonly encryptionService = inject(EncryptionService);
    private readonly sessionIdKey = 'sessionId';

    readonly sessionId$ = new BehaviorSubject(this.getSessionId());
    readonly account$ = this.sessionId$.pipe(
        switchMap((sessionId) => {
            return sessionId
                ? this.tmdbApiService.getAccount(sessionId)
                : of(null);
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

    private setSessionId(sessionId: string) {
        const encriptedData = this.encryptionService.encrypt(sessionId);

        localStorage.setItem(this.sessionIdKey, encriptedData);
        this.sessionId$.next(sessionId);
    }
}
