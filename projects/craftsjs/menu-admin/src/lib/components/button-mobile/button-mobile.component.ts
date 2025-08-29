import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import * as MenuActions from '../../actions/menu.actions';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'button-mobile',
    templateUrl: './button-mobile.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [MatButtonModule, MatIcon],
    host: {
        class: 'd-flex d-md-none justify-content-center'
    }
})
export class ButtonMobileComponent {

    constructor(private readonly _store: Store<any>) { }

    openMenu() {
        this._store.dispatch(MenuActions.menuOpened());
    }
}
