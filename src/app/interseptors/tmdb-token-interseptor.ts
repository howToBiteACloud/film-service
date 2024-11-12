import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiKey } from '../../../environment';

const TMDB_HOST = 'https://api.themoviedb.org';
@Injectable()
export class TmdbTokenInterseptor implements HttpInterceptor {
    intercept(
        request: HttpRequest<unknown>,
        next: HttpHandler
    ): Observable<HttpEvent<unknown>> {
        if (request.url.startsWith(TMDB_HOST)) {
            const modifiedRequest = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${apiKey}`,
                },
            });

            return next.handle(modifiedRequest);
        }

        return next.handle(request);
    }
}
