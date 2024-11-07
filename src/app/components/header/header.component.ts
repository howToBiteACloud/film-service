import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TuiTabs } from '@taiga-ui/kit';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [CommonModule, TuiTabs, RouterLink, RouterLinkActive],
    templateUrl: './header.component.html',
    styleUrl: './header.component.less',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {}
