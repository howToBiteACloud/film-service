import { TuiRoot } from '@taiga-ui/core';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    RouterLink,
    RouterLinkActive,
    RouterModule,
    RouterOutlet,
} from '@angular/router';
import { TuiTabs } from '@taiga-ui/kit';
import { AuthorizationFormComponent } from './components/authorization-form/authorization-form.component';
import { FilmCardsComponent } from './components/film-cards/film-cards.component';

@Component({
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        TuiRoot,
        AuthorizationFormComponent,
        FilmCardsComponent,
        RouterOutlet,
        RouterLink,
        RouterLinkActive,
        TuiTabs,
    ],
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.less',
})
export class AppComponent {
    title = 'film-service';
}
