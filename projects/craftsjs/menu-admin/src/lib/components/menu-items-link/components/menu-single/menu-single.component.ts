import { Component, ChangeDetectionStrategy, Input, OnInit } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';
import { MenuModel } from '../../../../models/menu.model';
import { Observable } from 'rxjs';
import { MenuService } from '../../../../services/menu.service';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'menu-single',
    templateUrl: './menu-single.component.html',
    styleUrls: ['./menu-single.component.scss'],
    host: {
        class: 'd-flex'
    },
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [MatButton, TranslateModule, AsyncPipe]
})
export class MenuSingleComponent implements OnInit {
    @Input()
    menu: MenuModel;

    collapse$: Observable<boolean>;

    constructor(private readonly _menuService: MenuService) { }

    ngOnInit(): void {
        this.collapse$ = this._menuService.collapseMenu$;
    }
}
