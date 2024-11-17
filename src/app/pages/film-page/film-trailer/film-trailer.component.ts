import { CommonModule } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    inject,
    Input,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { FilmVideo } from '../../../models';
import { SanitizePipe } from '../../../shared/pipes/sanitize.pipe';

@Component({
    selector: 'app-film-trailer',
    standalone: true,
    imports: [CommonModule, SanitizePipe],
    templateUrl: './film-trailer.component.html',
    styleUrl: './film-trailer.component.less',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilmTrailerComponent {
    private readonly domSanitizer = inject(DomSanitizer);

    @Input({ required: true }) video!: FilmVideo;
}
