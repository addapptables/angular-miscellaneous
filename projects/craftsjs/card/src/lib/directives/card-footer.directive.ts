import { Directive } from '@angular/core';

@Directive({
    selector: 'card-footer, [card-footer], [craftsjsCardFooter]',
    host: { class: 'card-footer' },
    standalone: true
})
export class CardFooterDirective { }
