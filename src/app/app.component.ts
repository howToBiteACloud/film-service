import { TuiRoot } from '@taiga-ui/core';
import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';

@Component({
    standalone: true,
    imports: [RouterModule, TuiRoot, RouterOutlet, HeaderComponent],
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.less',
})
export class AppComponent {
    title = 'film-service';
}
