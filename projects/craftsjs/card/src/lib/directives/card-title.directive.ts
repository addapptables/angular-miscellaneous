import { Directive } from '@angular/core';

@Directive({
    selector: 'card-title, [card-title], [craftsjsCardTitle]',
    host: { class: 'card-header-title' },
    standalone: true
})
export class CardTitleDirective { }
