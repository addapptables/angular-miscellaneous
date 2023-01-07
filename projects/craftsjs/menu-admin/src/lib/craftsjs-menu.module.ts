import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ReduxRegisterModule } from '@craftsjs/ngrx-actions';
import { PerfectScrollbarModule } from '@craftsjs/perfect-scrollbar';
import { CraftsjsMenuComponent } from './craftsjs-menu.component';
import { MenuHeaderComponent } from './components/menu-header/menu-header.component';
import { MenuItemsLinkComponent } from './components/menu-items-link/menu-items-link.component';
import { MenuGroupComponent } from './components/menu-items-link/components/menu-group/menu-group.component';
import { MenuSingleComponent } from './components/menu-items-link/components/menu-single/menu-single.component';
import { MenuUserComponent } from './components/menu-user/menu-user.component';
import { MenuStore } from './store/menu.store';
import { SharedPrintMenuComponent } from './components/menu-items-link/components/shared-print-menu/shared-print-menu.component';
import { CollapseButtonMobileComponent } from './components/collapse-button-mobile/collapse-button-mobile.component';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyTooltipModule as MatTooltipModule } from '@angular/material/legacy-tooltip';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    RouterModule,
    PerfectScrollbarModule,
    ReduxRegisterModule.forFeature('craftsjsmenu', { sidebar: MenuStore }),
  ],
  declarations: [
    CraftsjsMenuComponent,
    CollapseButtonMobileComponent,
    MenuHeaderComponent,
    MenuItemsLinkComponent,
    MenuGroupComponent,
    MenuSingleComponent,
    MenuUserComponent,
    SharedPrintMenuComponent
  ],
  exports: [
    CraftsjsMenuComponent,
    MenuUserComponent,
    MenuItemsLinkComponent,
    MenuHeaderComponent,
    CollapseButtonMobileComponent
  ]
})
export class MenuModule { }
