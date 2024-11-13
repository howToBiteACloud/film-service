import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TuiSkeleton } from '@taiga-ui/kit';

@Component({
    selector: 'app-poster',
    standalone: true,
    imports: [TuiSkeleton],
    templateUrl: './poster.component.html',
    styleUrl: './poster.component.less',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PosterComponent {
    @Input({ required: true }) path!: string;
    @Input({ required: true }) alt!: string;

    isLoading = true;

    onLoad() {
        this.isLoading = false;
    }

    onError() {
        this.isLoading = false;
    }
}
