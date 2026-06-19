# craftsjs card

CraftsJS Card components and directives for Angular.

[See demo](http://addapptables.com/admin/components/cards)

[Example code](https://stackblitz.com/edit/angular-card-addapptables)

## Getting Started
To get started, let's install the package through npm:

Choose the version corresponding to your Angular version:

 Angular     | @craftsjs/card
 ----------- | -------------------
 19          | 7.x
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

Current version: 7.0.1 (Compatible with Angular v19)

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
@use '@angular/material' as mat;
@use '@craftsjs/card/craftsjs-card.theme' as card;

// Grid utility classes are now shipped as plain CSS:
//   @use '@craftsjs/core/craftsjs-grid.theme.css';
// (or import it from your global styles / angular.json)

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

@include mat.all-component-themes($craftsjs-app-theme);

body.theme-default {
    @include card.card($craftsjs-app-theme, $craftsjs-theme-variables);
}
```

### Multiple themes (theme switching)

`card($theme, $variables)` emits the full structure plus colors. To support more
than one theme, emit the structure once and apply only the colors per theme with
`card-color($theme)`:

```scss
// structure once
body { @include card.card($light-theme, $craftsjs-theme-variables); }

// colors per theme
body.theme-dark { @include card.card-color($dark-theme); }
```

> Note: the library now uses the modern Sass module system (`@use`) and the
> Angular Material **M2** theming API. The legacy `@import '~@angular/material/theming'`
> API was removed in Angular Material 19. The Bootstrap-style grid is now shipped
> as compiled CSS at `@craftsjs/core/craftsjs-grid.theme.css`.

- Do not forget to put the theme-default class in the html body
  and ensure Angular Material animations are provided (e.g., in main.ts: provideAnimations()).

```html
<body class="theme-default"></body>
```
