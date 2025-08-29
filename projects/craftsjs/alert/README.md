# craftsjs alert

craftsjs alert is a library for angular

[See demo](http://craftsjs.com/admin/components/modals-alerts)

[Example code](https://stackblitz.com/edit/angular-alert-craftsjs)

## Getting Started
To get started, let's install the package through npm:

Choose the version corresponding to your Angular version:

 | Angular | @craftsjs/alert |
 | ------- | --------------- |
 | 18      | 6.x             |
 | 15      | 5.x             |
 | 13      | 4.x             |
 | 12      | 3.x             |
 | 11      | 2.x             |

```
npm i @craftsjs/alert --S
```

## Compatibility

Current version: 6.1.0 (Compatible with Angular v18)

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
@import '~@craftsjs/alert/craftsjs-alert.theme';
@import '~@angular/material/theming';

$craftsjs-app-primary: mat-palette($mat-teal, 800);
$craftsjs-app-accent:  mat-palette($mat-pink, 800, A100, 100);
$craftsjs-app-warn: mat-palette($mat-red);
$craftsjs-app-theme: mat-light-theme($craftsjs-app-primary, $craftsjs-app-accent, $craftsjs-app-warn);
$craftsjs-theme-variables: (
    color-info: #20a9d2,
    color-success: #5cb85c,
    color-danger: #d43934,
    color-warning: #e09d3d
);

@include mat-core();
body.theme-default{
    @include angular-material-theme($craftsjs-app-theme);
    @include alert($craftsjs-theme-variables);
}
```

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
