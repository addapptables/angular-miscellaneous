import { Component, Input, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { Subscription } from 'rxjs';
import { MenuModel } from '../../../../models/menu.model';
import { MenuService } from '../../../../services/menu.service';

@Component({
    selector: 'menu-group',
    templateUrl: './menu-group.component.html',
    styleUrls: ['./menu-group.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuGroupComponent implements OnInit {

    isOpenSub = new BehaviorSubject<boolean>(false);

    isOpen$ = this.isOpenSub.asObservable();

    menuGroup: MenuModel;

    collapse$: Observable<boolean>;
    private _subs: Subscription[] = [];

    @Input()
    set menu(menu: MenuModel) {
        this.menuGroup = menu;
        if (this.menuGroup.children) {
            const manyActive = this.menuGroup.children.map(x => this._router.isActive(x.url, x.exact));
            if (manyActive.find(x => x === true)) {
                this.isOpenSub.next(true);
            }
        }
    }

    constructor(private _router: Router, private readonly _menuService: MenuService) { }

    ngOnInit(): void {
        this.collapse$ = this._menuService.collapseMenu$;

        // Close this group when another group opens
        this._subs.push(this._menuService.openedGroup$.subscribe(openedId => {
            if (!this.menuGroup) { return; }
            if (openedId === null) { // close all
                this.isOpenSub.next(false);
            } else if (openedId !== this.menuGroup.id) {
                this.isOpenSub.next(false);
            }
            // if openedId === this.menuGroup.id we let it be handled by openAndClose
        }));
    }

    ngOnDestroy(): void {
        this._subs.forEach(s => s.unsubscribe());
    }

    openAndClose() {
        const newState = !this.isOpenSub.getValue();
        this.isOpenSub.next(newState);
        // notify service so other groups can close
        this._menuService.openGroup(newState ? this.menuGroup?.id : null);
    }
}
