import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { menuOpened } from '../../actions/menu.actions';
import { MatIcon } from '@angular/material/icon';

@Component({
    selector: 'craftsjs-collapse-button-mobile',
    templateUrl: './collapse-button-mobile.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    host: {
        class: 'd-flex d-md-none justify-content-center'
    },
    imports: [MatIcon]
})
export class CollapseButtonMobileComponent {

    constructor(private readonly _store: Store<any>) { }

    openMenu() {
        this._store.dispatch(menuOpened());
    }
}
