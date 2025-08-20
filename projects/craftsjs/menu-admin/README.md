# craftsjs menu

ADAPTABLES menu is a library for angular

[See demo](http://craftsjs.com/admin/dashboard)

[Example code](https://stackblitz.com/edit/angular-menu-craftsjs)

## Getting Started
To get started, let's install the package through npm:

Choose the version corresponding to your Angular version:

 | Angular | @craftsjs/menu-admin |
 | ------- | -------------------- |
 | 18      | 6.x                  |
 | 15      | 5.x                  |
 | 13      | 4.x                  |
 | 12      | 3.x                  |
 | 11      | 2.x                  |

```
npm i @craftsjs/menu-admin --S
```

Install peer dependencies

```
npm i
@craftsjs/responsive
@craftsjs/ngrx-actions
@craftsjs/perfect-scrollbar
@craftsjs/core
perfect-scrollbar
@ngrx/store
@ngx-translate/core --S
```

## Configuration


The library is configured as follows:

```typescript
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
@NgModule({
    imports: [
        HttpClientModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (createTranslateLoader),
                deps: [HttpClient]
            }
        })
    ]
})
export class AppModule { }
```



```typescript
import { ResponsiveModule } from '@craftsjs/responsive';
@NgModule({
    imports: [
        StoreModule.forRoot(...your configuration),
        EffectsModule.forRoot([]),
        ResponsiveModule // important
    ],
})
export class AppModule { }
```


## How to use?


```typescript

import { MenuModule } from '@craftsjs/menu';
@NgModule({
  imports: [MenuModule]
  declarations: [MenuComponent]
})
export class YourModule { }


// component
import { MenuModel, MenuHeaderModel, MenuUserModel } from '@craftsjs/menu';
@Component(
    ...
)
export class MenuComponent {
    // variable to show the links of the menu
    menus: MenuModel[] = [
    {
        id: '1',
        class: 'material-icons',
        value: 'dashboard',
        title: 'menu.dashboard',
        isOpen: false,
        multiOption: false,
        url: '/admin/dashboard',
        exact: true,
    },
    {
        id: '2',
        class: 'material-icons',
        value: 'chrome_reader_mode',
        title: 'menu.forms',
        isOpen: false,
        multiOption: true,
        exact: true,
        children: [
            {
                id: '3',
                value: 'BF',
                title: 'menu.form.basicForm',
                isOpen: false,
                multiOption: false,
                url: '/admin/forms/basic-form',
                exact: true
            }
        ]
    }]

    // header of the menu
    header: MenuHeaderModel = {
        companyName: 'craftsjs',
        logoUrl: 'assets/images/logo/addaptables.svg'
    };

    // user data
    user: MenuUserModel = {
        initialName: 'Cf',
        fullName: 'Craftsjs',
        email: 'dev@craftsjs.com',
        avatarUrl: 'assets/images/avatars/Velazquez.jpg'
    };
}
```


```html
<craftsjs-menu>
  <menu-header [header]="header">
  </menu-header>
  <menu-user [user]="user">
  </menu-user>
  <menu-items-link [menus]="menus">
  </menu-items-link>
</craftsjs-menu>
```


```html
    <button-mobile></button-mobile>
```


```scss
@import '~@craftsjs/core/craftsjs-grid.theme';
@import '~@angular/material/theming';
@import '~@craftsjs/menu/_craftsjs-menu.theme.scss';

$app-primary: mat-palette($mat-teal, 800);
$craftsjs-app-accent:  mat-palette($mat-pink, 800, A100, 100);
$craftsjs-app-warn: mat-palette($mat-red);
$craftsjs-app-theme: mat-light-theme($craftsjs-app-primary, $craftsjs-app-accent, $craftsjs-app-warn);
$craftsjs-theme-variables: (
    text: white,
    transition-time: 250ms,
    border-radius: 5px
);
@include mat-core();
body.theme-default {
    @include angular-material-theme($craftsjs-app-theme);
    @include menu($craftsjs-app-theme, $craftsjs-theme-variables);
}
```


```html
<body class="theme-default"></body>
```

# Assets

Background menu sidebar

```
/assets/images/backgrounds/sidebar.jpg

## Compatibility

Version 6: Compatible with Angular v18.
```
