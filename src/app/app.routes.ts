import { Route } from '@angular/router';

import { AuthorizationGuard } from './guards/authorization.guard';

export const appRoutes: Route[] = [
    {
        path: '',
        loadComponent: () =>
            import('./pages/film-list-page/film-list-page.component').then(
                (c) => c.FilmListPageComponent,
            ),
    },
    {
        path: 'film/:filmId',
        loadComponent: () =>
            import('./pages/film-page/film-page.component').then(
                (c) => c.FilmPageComponent,
            ),
    },
    {
        path: 'profile',
        loadComponent: () =>
            import('./pages/profile-page/profile-page.component').then(
                (c) => c.ProfilePageComponent,
            ),
        canActivate: [AuthorizationGuard],
    },
    {
        path: '**',
        loadComponent: () =>
            import('./pages/not-found-page/not-found-page.component').then(
                (c) => c.NotFoundPageComponent,
            ),
    },
];
