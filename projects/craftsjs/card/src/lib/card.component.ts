import { Component, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';


@Component({
    selector: 'craftsjs-card',
    templateUrl: './card.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: { class: 'card' },
    standalone: true
})
export class CardComponent { }
