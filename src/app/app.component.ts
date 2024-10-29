import { TuiRoot } from '@taiga-ui/core';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthorizationFormComponent } from './components/authorization-form/authorization-form.component';

@Component({
    standalone: true,
    imports: [RouterModule, TuiRoot, AuthorizationFormComponent],
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.less',
})
export class AppComponent {
    title = 'film-service';
}
