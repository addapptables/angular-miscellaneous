# craftsjs alert

craftsjs alert is a library for angular

[See demo](http://craftsjs.com/admin/components/modals-alerts)

[Example code](https://stackblitz.com/edit/angular-alert-craftsjs)

## Getting Started
To get started, let's install the package through npm:

Choose the version corresponding to your Angular version:

 | Angular | @craftsjs/alert |
 | ------- | --------------- |
 | 19      | 7.x             |
 | 18      | 6.x             |
 | 15      | 5.x             |
 | 13      | 4.x             |
 | 12      | 3.x             |
 | 11      | 2.x             |

```
npm i @craftsjs/alert --S
```

## Compatibility

Current version: 7.0.1 (Compatible with Angular v19)

Install peer dependencies

```
npm i @craftsjs/core @ngx-translate/core @angular/material @angular/cdk @angular/animations --S
```

## Configuration (i18n optional)

- If you want translations, configure `@ngx-translate/core` in your app. Example (standalone):

The library is configured as follows:

```typescript
// main.ts
import { bootstrapApplication, importProvidersFrom } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideCraftsjsAlert } from '@craftsjs/alert';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppComponent } from './app/app.component';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

bootstrapApplication(AppComponent, {
  providers: [
    provideAnimations(),
    provideCraftsjsAlert(),
    importProvidersFrom(
      HttpClientModule,
      TranslateModule.forRoot({
        loader: { provide: TranslateLoader, useFactory: createTranslateLoader, deps: [HttpClient] }
      })
    )
  ]
});
```

## How to use (standalone service)

- Inject `AlertService` anywhere and call the helpers. The dialog component is standalone and provided by the service.

```typescript
import { Component } from '@angular/core';
import { AlertService } from '@craftsjs/alert';

@Component({
  selector: 'app-alert-demo',
  standalone: true,
  template: `<button type="button" mat-raised-button color="primary" (click)="openDialog()">Alert warning</button>`
})
export class AlertDemoComponent {
  constructor(private _alertService: AlertService) {}

  openDialog() {
    this._alertService.showSimple('Alert', 'Simple alert');
    // this._alertService.showSuccess('Success', 'Saved successfully');
    // this._alertService.showWarning('Warn', 'Warning');
    // this._alertService.showInfo('Info', 'Information');
    // this._alertService.showError('Error', 'Error');
  }
}
```

```typescript
// Confirmation example
const dialog = this._alertService.showConfirmation('Confirmation', 'Are you sure delete alert?');
dialog.beforeClose().subscribe((result) => {
  if (!result) { return; }
  switch (result.result) {
    case 'ok':
      console.log('ok');
      break;
    case 'cancel':
      console.log('cancel');
      break;
  }
});
```

```html
    <button type="button" mat-raised-button color="primary" (click)="openDialog()">Alert warning</button>
```

- Finally, it is important to import the styles to the application

```scss
@use '@angular/material' as mat;
@use '@craftsjs/alert/craftsjs-alert.theme' as alert;

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

// The alert mixin expects the Material color config map.
$craftsjs-color-config: mat.m2-get-color-config($craftsjs-app-theme);

$craftsjs-theme-variables: (
    color-info: #20a9d2,
    color-success: #5cb85c,
    color-danger: #d43934,
    color-warning: #e09d3d
);

@include mat.all-component-themes($craftsjs-app-theme);

body.theme-default {
    @include alert.alert($craftsjs-theme-variables, $craftsjs-color-config);
}
```

### Multiple themes (theme switching)

`alert($variables, $theme)` emits the full structure plus colors. To support
more than one theme, emit the structure once and apply only the colors per theme
with `alert-color($theme)`:

```scss
// structure once
body { @include alert.alert($craftsjs-theme-variables, $light-color-config); }

// colors per theme
body.theme-dark { @include alert.alert-color($dark-color-config); }
```

> Note: the library now uses the modern Sass module system (`@use`) and the
> Angular Material **M2** theming API. The legacy `@import '~@angular/material/theming'`
> / `mat-palette` / `mat-light-theme` API was removed in Angular Material 19.

- Don't forget to put the theme-default class in the html body
  and ensure Angular Material animations are provided (e.g., `provideAnimations()` in main.ts).

## NgModule (compatibility)

```ts
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AlertModule } from '@craftsjs/alert';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    AlertModule.forRoot()
  ]
})
export class AppModule {}
```

```html
<body class="theme-default"></body>
```
