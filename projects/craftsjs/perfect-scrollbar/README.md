# craftsjs perfect-scrollbar
Utility directive to enhance scrollbars with perfect-scrollbar.

## Getting Started
To get started, let's install the package through npm:

Choose the version corresponding to your Angular version:

 Angular     | @craftsjs/perfect-scrollbar
 ----------- | -------------------
 18          | 6.x
 15          | 5.x
 13          | 4.x
 12          | 3.x
 11          | 2.x

```
npm i @craftsjs/perfect-scrollbar perfect-scrollbar --S
```

## Compatibility

Current version: 6.1.0 (Compatible with Angular v18)

## How to use

Use the standalone directive in your component

```ts
import { Component } from '@angular/core';
import { PerfectScrollbarDirective } from '@craftsjs/perfect-scrollbar';

@Component({
    selector: 'app-example',
    standalone: true,
    imports: [PerfectScrollbarDirective],
    template: `
        <div perfectScrollbar class="menu-scroll-container">
            ...large content
        </div>
    `
})
export class ExampleComponent {}
```

```css
    .menu-scroll-container{
        position: relative; //this property is important
    }
```
```html
<div perfectScrollbar class="menu-scroll-container">
    ...large content
</div>
```

Options
```ts
export interface Options {
    handlers?: string[];
    maxScrollbarLength?: number;
    minScrollbarLength?: number;
    scrollingThreshold?: number;
    scrollXMarginOffset?: number;
    scrollYMarginOffset?: number;
    suppressScrollX?: boolean;
    suppressScrollY?: boolean;
    swipeEasing?: boolean;
    useBothWheelAxes?: boolean;
    wheelPropagation?: boolean;
    wheelSpeed?: number;
  }
```

```html
<div perfectScrollbar [perfectScrollOptions]="{ wheelPropagation: true }" class="menu-scroll-container">
    ...large content
</div>
```
