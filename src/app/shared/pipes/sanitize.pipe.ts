import { inject, Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Pipe({
    name: 'sanitize',
    standalone: true,
})
export class SanitizePipe implements PipeTransform {
    private readonly domSanitizer = inject(DomSanitizer);

    transform(src: string): SafeResourceUrl {
        return this.domSanitizer.bypassSecurityTrustResourceUrl(src);
    }
}
