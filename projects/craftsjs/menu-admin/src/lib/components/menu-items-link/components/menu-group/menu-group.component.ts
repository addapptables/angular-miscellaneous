import { Component, Input, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { Router, IsActiveMatchOptions, UrlTree } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { Subscription } from 'rxjs';
import { MenuModel } from '../../../../models/menu.model';
import { MenuService } from '../../../../services/menu.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'menu-group',
  templateUrl: './menu-group.component.html',
  styleUrls: ['./menu-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [MatButton, MatIcon, TranslateModule, AsyncPipe],
  animations: [
    trigger('collapseExpand', [
      state('open', style({ height: '*', visibility: 'visible' })),
      state('closed', style({ height: '0px', visibility: 'hidden' })),
      transition('closed => open', [
        animate('220ms ease-out')
      ]),
      transition('open => closed', [
        animate('180ms ease-in')
      ])
    ]),
    trigger('chevronRotate', [
      state('open', style({ transform: 'rotate(180deg)' })),
      state('closed', style({ transform: 'rotate(0deg)' })),
      transition('closed => open', animate('220ms ease-out')),
      transition('open => closed', animate('180ms ease-in'))
    ])
  ]
})
export class MenuGroupComponent implements OnInit {

  isOpenSub = new BehaviorSubject<boolean>(false);

  isOpen$ = this.isOpenSub.asObservable();

  menuGroup: MenuModel;

  collapse$: Observable<boolean>;
  private _subs: Subscription[] = [];
  // Flag to open on init if current route is inside this group
  private _shouldOpenByRoute = false;

  // Performance hint: toggle content-visibility only after closing finishes
  useContentVisibility = false;

  /** Recursively checks if any descendant menu has an active route */
  private _hasActiveDescendant(menu: MenuModel | undefined): boolean {
    if (!menu || !menu.children || menu.children.length === 0) { return false; }
    for (const child of menu.children) {
      // If child has a concrete url, check it
      if (child.url) {
        const urlTree: UrlTree = child.url.startsWith('/')
          ? this._router.parseUrl(child.url)
          : this._router.createUrlTree([child.url]);
        const matchOptions: IsActiveMatchOptions = {
          paths: child.exact ? 'exact' : 'subset',
          queryParams: 'subset',
          fragment: 'ignored',
          matrixParams: 'ignored'
        };
        if (this._router.isActive(urlTree, matchOptions)) {
          return true;
        }
      }
      // Recurse into deeper groups
      if (this._hasActiveDescendant(child)) { return true; }
    }
    return false;
  }

  @Input()
  set menu(menu: MenuModel) {
    this.menuGroup = menu;
    const hasActive = this._hasActiveDescendant(this.menuGroup);
    if (hasActive) {
      this.isOpenSub.next(true);
          this._shouldOpenByRoute = true;
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
      } else if (openedId === this.menuGroup.id) { // open this group
        this.isOpenSub.next(true);
      } else { // another group opened
        this.isOpenSub.next(false);
      }
    }));

    // If route is active inside this group on reload, ensure it's opened in the shared service
    if (this._shouldOpenByRoute && this.menuGroup?.id) {
      this._menuService.openGroup(this.menuGroup.id);
    }
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

  onCollapseStart(event: any) {
    if (event.toState === 'open') {
      // Ensure content is rendered during expand
      this.useContentVisibility = false;
    }
  }

  onCollapseDone(event: any) {
    if (event.toState === 'closed') {
      // After collapsing, allow browser to skip rendering subtree
      this.useContentVisibility = true;
    }
  }
}
