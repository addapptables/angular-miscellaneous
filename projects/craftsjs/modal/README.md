# craftsjs modal

craftsjs modal is a library for angular

[See demo](http://craftsjs.com/admin/ecommerce/products)

## Getting Started
To get started, let's install the package through npm:

Choose the version corresponding to your Angular version:

 Angular     | @craftsjs/modal
 ----------- | -------------------
 18          | 6.x
 15          | 5.x
 13          | 4.x
 12          | 3.x
 11          | 2.x

```
npm i @craftsjs/modal --S
```

## Compatibility

Current version: 6.1.0 (Compatible with Angular v18)

Install peer dependencies

```
npm i
@craftsjs/perfect-scrollbar
perfect-scrollbar
@angular/material
@angular/cdk
@angular/animations --S
```

## How to use

- Import the module ModalModule into the AppModule

```typescript
import { ModalModule } from '@craftsjs/modal';
@NgModule({
  imports: [ModalModule.forRoot({ width: '800px' })]
})
export class AppModule { }
```

- Standalone (Angular 15+ / 18): usa providers en vez de NgModule

```typescript
// main.ts
import { bootstrapApplication, importProvidersFrom } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideCraftsjsModal } from '@craftsjs/modal';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideAnimations(),
    provideCraftsjsModal({ width: '800px' })
  ]
});
```

- Alternativa standalone compat (reutilizando NgModule):

```typescript
// main.ts
import { bootstrapApplication, importProvidersFrom } from '@angular/platform-browser';
import { ModalModule } from '@craftsjs/modal';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(ModalModule.forRoot({ width: '800px' }))
  ]
});
```

- Create a component modal

```typescript
@Component({
...
})
export class FormModalComponent {

  constructor(
    private _dialogRef: MatDialogRef<FormModalComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  close() {
    this._dialogRef.close();
  }

}
```

```html
<craftsjs-modal>
  <modal-header>
    <h3 class="text-accent">Title</h3>
    <button mat-icon-button (click)="close()">
      <mat-icon suffix>close</mat-icon>
    </button>
  </modal-header>
  <modal-body>
    //modal body
  </modal-body>
  <modal-footer>
    <button type="submit" mat-raised-button color="accent">
      Save
    </button>
    <button type="button" mat-raised-button (click)="close()">Close</button>
  </modal-footer>
</craftsjs-modal>
```

```typescript
import { ModalModule } from '@craftsjs/modal';

@NgModule({
  imports: [ModalModule],
  entryComponents: [
    FormModalComponent // this line is important
  ]
})
export class OtherModule { }

```typescript
@Component({
...
})
export class ProductListComponent {

  constructor(
    private _modalService: ModalService

  showModal() {
    this._modalService.show(FormModalComponent);
  }
}
```
