# craftsjs core

Base utilities for CraftsJS: a responsive NgRx feature store and a directive for dynamic component insertion.

## Compatibility

Current version: 6.1.0 (compatible with Angular v18)

| Angular | @craftsjs/core |
| ------- | -------------- |
| 18      | 6.x            |
| 15      | 5.x            |
| 13      | 4.x            |
| 12      | 3.x            |
| 11      | 2.x            |

## Installation

```
npm i @craftsjs/core --S
```

Peer dependencies: `@ngrx/store` and `@craftsjs/ngrx-action`.

```
npm i @ngrx/store @craftsjs/ngrx-action --S
```

## Usage (standalone, Angular 15+/18)

- Provide at bootstrap (registers the `responsive` feature):

```ts
// main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { provideStore } from '@ngrx/store';
import { provideCraftsjsCore } from '@craftsjs/core';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
	providers: [
		provideStore(),
		provideCraftsjsCore()
	]
});
```

- Or at route-level (lazy providers):

```ts
import { Routes } from '@angular/router';
import { provideCraftsjsCore } from '@craftsjs/core';

export const routes: Routes = [
	{
		path: 'feature',
		loadComponent: () => import('./feature/feature.component').then(m => m.FeatureComponent),
		providers: [provideCraftsjsCore()]
	}
];
```

- Standalone directive `DynamicDirective`:

```ts
import { Component } from '@angular/core';
import { DynamicDirective } from '@craftsjs/core';

@Component({
	selector: 'example',
	standalone: true,
	imports: [DynamicDirective],
	template: `<ng-container craftsjsDynamic></ng-container>`
})
export class ExampleComponent {}
```

## NgModule (compatibility)

```ts
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { CoreModule } from '@craftsjs/core';

@NgModule({
	imports: [
		StoreModule.forRoot({}),
		CoreModule
	]
})
export class AppModule {}
```

## Styles (grid)

Add the grid theme to your global styles:

```scss
@import '~@craftsjs/core/craftsjs-grid.theme';
```
