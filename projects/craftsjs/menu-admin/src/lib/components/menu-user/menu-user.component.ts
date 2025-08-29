import { Component, Input, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';
import { MenuUserModel } from '../../models/menu-user.model';
import { MenuService } from '../../services/menu.service';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'menu-user',
    templateUrl: './menu-user.component.html',
    styleUrls: ['./menu-user.component.scss'],
    host: {
        class: 'menu-user d-flex flex-column align-items-center'
    },
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [MatTooltip, AsyncPipe]
})
export class MenuUserComponent implements OnInit {

    @Input()
    user: MenuUserModel;

    collapse$: Observable<boolean>;

    constructor(private readonly _menuService: MenuService) {

    }

    ngOnInit(): void {
        this.collapse$ = this._menuService.collapseMenu$;
    }

}
