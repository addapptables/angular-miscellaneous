import { Directive } from '@angular/core';

@Directive({
    selector: 'card-body, [card-body], [craftsjsCardBody]',
    host: { class: 'card-body' },
    standalone: true
})
export class CardBodyDirective { }
