import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { selectAllScreen } from '@craftsjs/core';
import { map, distinctUntilChanged, shareReplay } from 'rxjs/operators';
import { Observable, combineLatest, BehaviorSubject } from 'rxjs';
import * as MenuActions from '../actions/menu.actions';
import { selectActiveMenuMini, selectMenuOpen } from '../selectors/menu.selector';

@Injectable({
    providedIn: 'root'
})
export class MenuService {

    activeMenuMini$: Observable<boolean>;

    activeMobile$: Observable<boolean>;

    collapseMenu$: Observable<boolean>;

    open$: Observable<boolean>;
    /** Emits the id of the currently opened menu-group (or null when none) */
    openedGroup$: Observable<string | null>;

    private _openedGroupSub = new BehaviorSubject<string | null>(null);

    constructor(private readonly _store: Store<any>) {
    }

    init() {
        this.open$ = this._store.pipe(
            select(selectMenuOpen)
        );
        this.initMenuMini();
        this.initScreen();
        this.openedGroup$ = this._openedGroupSub.asObservable();
        this.collapseMenu$ = combineLatest([
            this.activeMenuMini$,
            this.activeMobile$
        ]).pipe(
            map(([activeMenuMini, activeMobile]) => (activeMenuMini && !activeMobile)),
            distinctUntilChanged(),
            shareReplay()
        );
    }

    /** Open a menu-group by id. Pass null to close all groups. */
    openGroup(id: string | null) {
        this._openedGroupSub.next(id);
    }

    private initMenuMini() {
        this.activeMenuMini$ = this._store.pipe(
            select(selectActiveMenuMini),
            distinctUntilChanged()
        );
    }

    private initScreen() {
        this.activeMobile$ = combineLatest([
            this._store.pipe(
                select(selectAllScreen),
                map(x => x.xs || x.sm),
                distinctUntilChanged(),
                shareReplay()
            ),
            this.open$
        ]).pipe(
            map(([activeMobile, isOpen]) => {
                isOpen && !activeMobile && this._store.dispatch(MenuActions.menuOpened());
                return activeMobile;
            }),
            distinctUntilChanged(),
            shareReplay()
        );
    }
}
