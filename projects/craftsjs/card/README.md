# craftsjs card

CraftsJS Card components and directives for Angular.

[See demo](http://addapptables.com/admin/components/cards)

[Example code](https://stackblitz.com/edit/angular-card-addapptables)

## Getting Started
To get started, let's install the package through npm:

Choose the version corresponding to your Angular version:

 Angular     | @craftsjs/card
 ----------- | -------------------
 18          | 6.x
 15          | 5.x
 13          | 4.x
 12          | 3.x
 11          | 2.x
 10          | 1.x

```
npm i @craftsjs/card --S
```

## Compatibility

Current version: 6.1.0 (Compatible with Angular v18)

Install peer dependencies

```
npm i @craftsjs/core @angular/material @angular/animations @angular/cdk --S
```

## How to use (standalone, Angular 15+/18)

- Import the standalone components and directives where you use them:

```typescript
import { Component } from '@angular/core';
import {
  CardComponent,
  CardHeaderComponent,
  CardHeaderLinearComponent,
  CardHeaderOvalComponent,
  CardBodyDirective,
  CardTitleDirective
} from '@craftsjs/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-card-demo',
  standalone: true,
  imports: [
    CardComponent,
    CardHeaderComponent,
    CardHeaderLinearComponent,
    CardHeaderOvalComponent,
    CardBodyDirective,
    CardTitleDirective,
    MatIconModule,
    MatDividerModule
  ],
  templateUrl: './card-demo.component.html'
})
export class CardDemoComponent {}
```

simple card
```html
<craftsjs-card>
  <card-header>
    <card-header-linear>
      <card-title>
        <mat-icon matSuffix>horizontal_split</mat-icon>
        <span>Simple card</span>
      </card-title>
    </card-header-linear>
  </card-header>
  <mat-divider></mat-divider>
  <card-body>
    // custom component
  </card-body>
</craftsjs-card>
```

Oval card
```html
<craftsjs-card>
  <card-header>
    <card-header-oval>
      <card-title>
        <mat-icon matSuffix>horizontal_split</mat-icon>
        <span>Oval card</span>
      </card-title>
    </card-header-oval>
  </card-header>
  <card-body>
    // custom component
  </card-body>
</craftsjs-card>
```

- Finally, import the styles into your application

```scss
@import '~@craftsjs/core/craftsjs-grid.theme';
@import '~@angular/material/theming';
@import '~@craftsjs/card/craftsjs-card.theme';

$craftsjs-app-primary: mat-palette($mat-teal, 800);
$craftsjs-app-accent:  mat-palette($mat-pink, 800, A100, 100);
$craftsjs-app-warn: mat-palette($mat-red);
$craftsjs-app-theme: mat-light-theme($craftsjs-app-primary, $craftsjs-app-accent, $craftsjs-app-warn);
$craftsjs-theme-variables: (
    text: white,
    border-radius: 5px,
    color-blue: #20a9d2,
    color-success: #5cb85c,
    color-info: #5bc0de,
    color-warning: #e09d3d,
    color-danger: #d43934,
    gray-color: #696868
);
@include mat-core();
body.theme-default {
    @include angular-material-theme($craftsjs-app-theme);
    @include card($craftsjs-app-theme, $craftsjs-theme-variables);
}
```

- Do not forget to put the theme-default class in the html body
  and ensure Angular Material animations are provided (e.g., in main.ts: provideAnimations()).

```html
<body class="theme-default"></body>
```
