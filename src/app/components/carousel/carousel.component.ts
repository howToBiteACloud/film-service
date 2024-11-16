import { CommonModule } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    HostBinding,
    Input,
    ViewChild,
} from '@angular/core';
import { TuiButton } from '@taiga-ui/core';

enum Direction {
    Left = 0,
    Right = 1,
}

@Component({
    selector: 'app-carousel',
    standalone: true,
    imports: [CommonModule, TuiButton],
    templateUrl: './carousel.component.html',
    styleUrl: './carousel.component.less',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarouselComponent {
    readonly direction = Direction;

    @ViewChild('carousel', { static: false }) carousel!: ElementRef;

    @Input({ required: true }) gapSize!: number;

    @Input({ required: true })
    countElements!: number;

    @HostBinding('style.--gap-size') get gapStyle(): string {
        return this.gapSize + 'px';
    }
    @HostBinding('style.--countElements') get count(): number {
        return this.countElements;
    }

    scrollCarousel(direction: Direction) {
        const carousel = this.carousel.nativeElement;
        const offsetX = this.getOffsetX(carousel);

        if (direction === Direction.Right) {
            carousel.scrollBy({
                left: offsetX,
                behavior: 'smooth',
            });
        } else {
            carousel.scrollBy({ left: -offsetX, behavior: 'smooth' });
        }
    }

    private getOffsetX(carousel: HTMLDivElement): number {
        const carouselWidth = carousel.clientWidth;
        const elementWidth =
            (carouselWidth - this.gapSize * (this.countElements - 1)) /
            this.countElements;

        return carouselWidth - elementWidth;
    }
}
