import { Component, Input, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { SharedPrintMenuComponent } from './components/shared-print-menu/shared-print-menu.component';
import { MenuModel } from '../../models/menu.model';

@Component({
    selector: 'menu-items-link',
    templateUrl: './menu-items-link.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'menu-children-items'
    },
    standalone: true,
    imports: [SharedPrintMenuComponent]
})
export class MenuItemsLinkComponent {
    @Input()
    menus: MenuModel[];
}
