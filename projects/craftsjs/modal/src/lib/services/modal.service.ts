import { Injectable, TemplateRef, Inject, Injector, ViewContainerRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ComponentType } from '@angular/cdk/portal';
import { CRAFTSJS_MODAL_CONFIG } from '../tokens';
import { ModalConfig } from '../models/modal-config.model';

export interface ModalData<T = any> { 
  data?: T;
  injector?: Injector;
  viewContainerRef?: ViewContainerRef;
}

@Injectable()
export class ModalService {

  constructor(
    private _dialog: MatDialog,
    @Inject(CRAFTSJS_MODAL_CONFIG) private modalConfig: ModalConfig
  ) { }

  show<T = any>(component: ComponentType<T> | TemplateRef<T>, data?: ModalData) {
    return this._dialog.open(component, {
      data: data.data,
      width: this.modalConfig.width,
      injector: data.injector,
      viewContainerRef: data.viewContainerRef
    });
  }

}
