import { Directive } from '@angular/core';

@Directive({
    selector: 'card-header-subtitle, [card-header-subtitle], [craftsjsCardHeaderSubtitle]',
    host: {
        class: 'card-header-subtitle'
    },
    standalone: true
})
export class CardHeaderSubtitleDirective { }
