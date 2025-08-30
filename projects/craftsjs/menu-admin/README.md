# craftsjs menu

CraftsJS menu is a library for Angular.

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
npm i @craftsjs/responsive @craftsjs/ngrx-action @craftsjs/perfect-scrollbar @craftsjs/core perfect-scrollbar @ngrx/store @ngx-translate/core --S
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


## How to use (standalone, Angular 15+/18)

- Providers en el bootstrap (registra el feature del menú):

```ts
// main.ts
import { bootstrapApplication, importProvidersFrom } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideStore } from '@ngrx/store';
import { provideCraftsjsMenu } from '@craftsjs/menu-admin';
import { AppComponent } from './app/app.component';
import { TranslateModule } from '@ngx-translate/core';

bootstrapApplication(AppComponent, {
    providers: [
        provideAnimations(), // or provideNoopAnimations()
        provideStore(),
    provideCraftsjsMenu(),
        // i18n (opcional, según tu app)
        importProvidersFrom(TranslateModule.forRoot())
    ]
});
```

- Usa los componentes standalone del menú en tu componente:

```ts
// app.component.ts
import { Component } from '@angular/core';
import { MenuComponent, MenuHeaderComponent, MenuUserComponent, MenuItemsLinkComponent } from '@craftsjs/menu-admin';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [MenuComponent, MenuHeaderComponent, MenuUserComponent, MenuItemsLinkComponent],
    templateUrl: './app.component.html'
})
export class AppComponent {}
```


```typescript
// component (ejemplo de datos)
import { MenuModel, MenuHeaderModel, MenuUserModel } from '@craftsjs/menu-admin';
@Component({
    // ...
})
export class ExampleComponent {
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
    <menu-header [header]="header"></menu-header>
    <menu-user [user]="user"></menu-user>
    <menu-items-link [menus]="menus"></menu-items-link>
</craftsjs-menu>
```


```html
<button-mobile></button-mobile>
```

### Lazy por rutas (opcional)

```ts
// app.routes.ts
import { Routes } from '@angular/router';
import { provideCraftsjsMenu } from '@craftsjs/menu-admin';

export const routes: Routes = [
    {
        path: 'admin',
        loadComponent: () => import('./admin/admin.component').then(m => m.AdminComponent),
    providers: [provideCraftsjsMenu()]
    }
];
```

## NgModule (compatibilidad)

```ts
import { MenuModule } from '@craftsjs/menu-admin';
@NgModule({
    imports: [MenuModule]
})
export class YourModule {}
```


```scss
@import '~@craftsjs/core/craftsjs-grid.theme';
@import '~@angular/material/theming';
@import '~@craftsjs/menu-admin/_craftsjs-menu.theme.scss';

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

## Notas

- Requiere `@ngrx/store` provisto en la app (p. ej., `provideStore()` en standalone o `StoreModule.forRoot()` en NgModule).
- Angular Material necesita `provideAnimations()` o `NoopAnimations`.
- Evita registrar el mismo feature key más de una vez.

## Assets

Background menu sidebar

```
/assets/images/backgrounds/sidebar.jpg
```

## Compatibility

Current version: 6.1.0 (Compatible with Angular v18)
