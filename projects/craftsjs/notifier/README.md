# craftsjs notifier

CraftsJS Notifier service and component for Angular.

[See demo](http://addapptables.com/admin/components/notifiers)

[Example code](https://stackblitz.com/edit/angular-notifier)

## Getting Started
To get started, let's install the package through npm:

Choose the version corresponding to your Angular version:

 Angular     | @craftsjs/notifier
 ----------- | -------------------
 19          | 7.x
 18          | 6.x
 15          | 5.x
 13          | 4.x
 12          | 3.x
 11          | 2.x

```
npm i @craftsjs/notifier --S
```

## Compatibility

Current version: 7.0.0 (Compatible with Angular v19)

Install peer dependencies

```
npm i @craftsjs/core @angular/material @angular/cdk @angular/animations --S
```

## How to use (standalone)

- Provide the notifier and use the service. Place the component where notifications should render.

```typescript
// main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { provideCraftsjsNotifier } from '@craftsjs/notifier';
import { AppComponent } from './app/app.component';
import { NotifierPositionType } from '@craftsjs/notifier';

bootstrapApplication(AppComponent, {
  providers: [
    provideCraftsjsNotifier({
      position: NotifierPositionType.bottomRight,
      timeout: 5000,
      classIcon: 'material-icons',
      iconValue: 'notifications'
    })
  ]
});
```

- Import the module NotifierModule into the ChildModule

```typescript
import { NotifierModule } from '@craftsjs/notifier';
import { Component } from '@angular/core';
import { NotifierComponent } from '@craftsjs/notifier';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NotifierComponent],
  template: `
    <button type="button" mat-raised-button color="primary" (click)="openNotifier()">Notifier success</button>
    <addapptable-notifier />
  `
})
export class AppComponent { /* ... */ }
```

- Create a component an inject NotifierService

```typescript
@Component(// ...)
export class NotifierDemoComponent {

  constructor(private notifierService: NotifierService) { }

  openNotifier() {
    this.notifierService.open({
      type: NotifierType.success,
      message: 'Notifier success'
    });
  }
}
```
```html
    <button type="button" mat-raised-button color="primary" (click)="openNotifier()">Notifier success</button>
```

- Notifier type options

```typescript
export enum NotifierType {
    primary,
    accent,
    success,
    warning,
    danger,
    info
}
```

## Custom notifier

```typescript
@Component(// ...)
export class NotifierCustomComponent {
  constructor(@Inject(CRAFTSJS_NOTIFIER_DATA) public notifier: Notifier) {
    console.log(notifier);
  }
}
```

```html
    <span class="notifier-custom">
        <mat-icon suffix *ngIf="notifier.data?.icon">{{notifier.data.icon}}</mat-icon> {{notifier.message}}
    </span>
```

```typescript
import { NotifierModule } from '@craftsjs/notifier';
@NgModule({
  imports: [
    //...,
    NotifierModule
  ],
  declarations: [NotifierCustomComponent, NotifierCustomSuccessComponent],
  entryComponents: [
    NotifierCustomComponent // important this line
  ]
})
export class ChildModuleModule { }
```

```typescript
@Component(// ...)
export class NotifierCustomSuccessComponent {

  constructor(private notifierService: NotifierService) { }

  openNotifier() {
    this.notifierService.open({
      type: NotifierType.success,
      message: 'Custom notifier success',
      templateOrComponent: NotifierCustomComponent,
      data: {
        icon: 'done'
      }
    });
  }
}
```

## Styles

```scss
@use '@angular/material' as mat;
@use '@craftsjs/notifier/craftsjs-notifier.theme' as notifier;

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

// The notifier mixin expects the Material color config map.
$craftsjs-color-config: mat.m2-get-color-config($craftsjs-app-theme);

$craftsjs-theme-variables: (
    color-info: #20a9d2,
    color-success: #5cb85c,
    color-danger: #d43934,
    color-warning: #e09d3d
);

@include mat.all-component-themes($craftsjs-app-theme);

body.theme-default {
    @include notifier.notifier($craftsjs-color-config, $craftsjs-theme-variables);
}
```

> Note: the library now uses the modern Sass module system (`@use`) and the
> Angular Material **M2** theming API. The legacy `@import '~@angular/material/theming'`
> API was removed in Angular Material 19.

- Do not forget to put the theme-default class in the html body
  and ensure Angular Material animations are provided (e.g., provideAnimations()).

## NgModule (compatibility)

```ts
import { NgModule } from '@angular/core';
import { NotifierModule } from '@craftsjs/notifier';

@NgModule({
  imports: [
    NotifierModule.forRoot({
      position: NotifierPositionType.bottomRight,
      timeout: 5000,
      classIcon: 'material-icons',
      iconValue: 'notifications'
    })
  ]
})
export class AppModule {}
```

```html
<body class="theme-default"></body>
```
