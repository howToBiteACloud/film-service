import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import {
    HTTP_INTERCEPTORS,
    provideHttpClient,
    withInterceptorsFromDi,
} from '@angular/common/http';
import {
    ApplicationConfig,
    isDevMode,
    provideZoneChangeDetection,
} from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { NG_EVENT_PLUGINS } from '@taiga-ui/event-plugins';

import { appRoutes } from './app.routes';
import { TmdbTokenInterseptor } from './interseptors/tmdb-token-interseptor';
import { FilmEffects } from './pages/film-page/store/film.effects';
import { filmFeature } from './pages/film-page/store/film.reducer';

export const appConfig: ApplicationConfig = {
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TmdbTokenInterseptor,
            multi: true,
        },
        provideAnimations(),
        provideHttpClient(withInterceptorsFromDi()),
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(appRoutes),
        NG_EVENT_PLUGINS,
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        provideStore(),
        provideState(filmFeature),
        provideEffects(FilmEffects),
        provideStoreDevtools({
            maxAge: 25, // Retains last 25 states
            logOnly: !isDevMode(), // Restrict extension to log-only mode
            autoPause: true, // Pauses recording actions and state changes when the extension window is not open
            trace: false, //  If set to true, will include stack trace for every dispatched action, so you can see it in trace tab jumping directly to that part of code
            traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
            connectInZone: true, // If set to true, the connection is established within the Angular zone
        }),
    ],
};
