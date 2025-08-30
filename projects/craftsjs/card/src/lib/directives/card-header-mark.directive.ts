import { Directive } from '@angular/core';

@Directive({
    selector: 'card-header-mark, [card-header-mark], [craftsjsCardHeaderMark]',
    host: {
        class: 'card-header-subtitle-mark'
    },
    standalone: true
})
export class CardHeaderMarkDirective { }
