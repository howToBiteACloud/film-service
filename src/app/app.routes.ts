import { Route } from '@angular/router';
import { FilmListPageComponent } from './pages/film-list-page/film-list-page.component';

export const appRoutes: Route[] = [
    {
        path: '',
        component: FilmListPageComponent,
    },
];
