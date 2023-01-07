import {
  Component,
  ChangeDetectionStrategy,
  Inject,
  ViewEncapsulation,
  OnInit,
  Injector,
  InjectionToken,
  Type,
  ViewContainerRef,
  QueryList,
  ViewChildren,
  AfterViewInit,
  TemplateRef
} from '@angular/core';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { AlertModel } from '../../models/alert.model';
import { alertComponents } from './components/components';
import { DynamicDirective } from '@craftsjs/core';

export const CRAFTSJS_ALERT_DATA = new InjectionToken<any>('CraftsjsAlertData');

@Component({
  selector: 'dialog-alert',
  templateUrl: './dialog-alert.component.html',
  styleUrls: ['./dialog-alert.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class DialogAlertComponent implements OnInit, AfterViewInit {

  @ViewChildren(DynamicDirective)
  appDynamic: QueryList<DynamicDirective>;

  constructor(
    public dialogRef: MatDialogRef<DialogAlertComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AlertModel,
  ) {
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.loadComponents();
  }

  private loadComponents() {
    const itemComponent = alertComponents.find(x => x.type === this.data.type);
    const component = itemComponent && itemComponent.component;
    this.resolveComponent(component, this.appDynamic.find(x => x.name === 'alert-icon').viewContainerRef);
    this.resolveComponent(this.data.customBody, this.appDynamic.find(x => x.name === 'alert-body').viewContainerRef);
    this.resolveComponent(this.data.customButtonComponent, this.appDynamic.find(x => x.name === 'alert-buttons').viewContainerRef);
  }

  private resolveComponent(component: Type<any> | TemplateRef<any>, viewContainerRef: ViewContainerRef) {
    if (!component) { return; }
    viewContainerRef.clear();
    if (component instanceof TemplateRef) {
      viewContainerRef.createEmbeddedView(component, { $implicit: this.data, dialogRef: this.dialogRef });
    } else {
      const injector = this.createInjector(viewContainerRef.injector);
      viewContainerRef.createComponent(component, {
        injector
      });
    }
  }

  private createInjector(injector: Injector) {
    return Injector.create({
      providers: [{
        provide: CRAFTSJS_ALERT_DATA,
        useValue: this.data
      },
      {
        provide: MatDialogRef,
        useValue: this.dialogRef
      }],
      parent: injector
    })
  }

  buttonClick(result: string) {
    this.dialogRef.close({ data: this.data, result });
  }

}
