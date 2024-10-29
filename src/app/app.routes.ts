import { Route } from '@angular/router';
import { AuthorizationFormComponent } from './components/authorization-form/authorization-form.component';
import { FilmListPageComponent } from './components/film-list-page/film-list-page.component';

export const appRoutes: Route[] = [
    {
        path: 'authorization',
        component: AuthorizationFormComponent,
    },
    {
        path: '',
        component: FilmListPageComponent,
    },
];
