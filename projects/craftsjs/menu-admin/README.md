# craftsjs menu

CraftsJS menu is a library for Angular.

[See demo](http://craftsjs.com/admin/dashboard)

[Example code](https://stackblitz.com/edit/angular-menu-craftsjs)

## Getting Started
To get started, let's install the package through npm:

Choose the version corresponding to your Angular version:

 | Angular | @craftsjs/menu-admin |
 | ------- | -------------------- |
 | 19      | 7.x                  |
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
@use '@angular/material' as mat;
@use '@craftsjs/menu-admin/craftsjs-menu.theme' as menu;

// Grid utility classes are now plain CSS:
//   @use '@craftsjs/core/craftsjs-grid.theme.css';

@include mat.core();

$craftsjs-app-primary: mat.m2-define-palette(mat.$m2-teal-palette, 800);
$craftsjs-app-accent:  mat.m2-define-palette(mat.$m2-pink-palette, 800, A100, 100);
$craftsjs-app-warn:    mat.m2-define-palette(mat.$m2-red-palette);
$craftsjs-app-theme: mat.m2-define-light-theme((
    color: (
        primary: $craftsjs-app-primary,
        accent: $craftsjs-app-accent,
        warn: $craftsjs-app-warn,
    ),
));

// The menu mixin expects the Material color config map.
$craftsjs-color-config: mat.m2-get-color-config($craftsjs-app-theme);

$craftsjs-theme-variables: (
    text: white,
    transition-time: 250ms,
    border-radius: 5px
);

@include mat.all-component-themes($craftsjs-app-theme);

body.theme-default {
    @include menu.menu($craftsjs-color-config, $craftsjs-theme-variables);
}
```

### Multiple themes (theme switching)

`menu($theme, $variables)` emits the full structure plus colors. To support more
than one theme, emit the structure once and apply only the colors per theme with
`menu-color($theme)`:

```scss
// structure once
body { @include menu.menu($light-color-config, $craftsjs-theme-variables); }

// colors per theme
body.theme-dark { @include menu.menu-color($dark-color-config); }
```

> Note: the library now uses the modern Sass module system (`@use`) and the
> Angular Material **M2** theming API. The legacy `@import '~@angular/material/theming'`
> API was removed in Angular Material 19. The grid is shipped as compiled CSS at
> `@craftsjs/core/craftsjs-grid.theme.css`.


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

Current version: 7.0.1 (Compatible with Angular v19)
