import { Route } from '@angular/router';
import { FilmCardsComponent } from './components/film-cards/film-cards.component';
import { AuthorizationFormComponent } from './components/authorization-form/authorization-form.component';

export const appRoutes: Route[] = [
    {
        path: 'film-cards',
        component: FilmCardsComponent,
    },
    {
        path: 'authorization',
        component: AuthorizationFormComponent,
    },
];
