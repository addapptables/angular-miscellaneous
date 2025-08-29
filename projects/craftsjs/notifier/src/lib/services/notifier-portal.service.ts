import { Injectable, ApplicationRef, Inject, Injector, EnvironmentInjector, createComponent, ComponentRef, Type } from '@angular/core';
import { NotifierContainerService } from './notifier-container.service';
import { DOCUMENT } from '@angular/common';
import { DomPortalOutlet } from '@angular/cdk/portal';
import { NOTIFIER } from '../constants';

let nextUniqueId = 0;

@Injectable()
export class NotifierPortalService {

  private _appRef: ApplicationRef;
  private _envInjector: EnvironmentInjector | null = null;

  constructor(
    private _notifierContainerService: NotifierContainerService,
    @Inject(DOCUMENT) private _document: any,
    private _injector: Injector
  ) { }

  attachComponent<T>(component: Type<T>, elementInjector?: Injector): { componentRef: ComponentRef<T>; id: string; destroy: () => void } {
    const pane = this._createPaneElement();

    if (!this._appRef) {
      this._appRef = this._injector.get<ApplicationRef>(ApplicationRef);
    }
    if (!this._envInjector) {
      // Prefer ApplicationRef.injector (root injector) if available; otherwise current injector
      const appInjector: any = (this._appRef as any).injector;
      this._envInjector = appInjector?.get?.(EnvironmentInjector) ?? this._injector.get(EnvironmentInjector);
    }

    const componentRef = createComponent(component, {
      environmentInjector: this._envInjector,
      elementInjector: elementInjector ?? this._injector,
      hostElement: pane,
    });

    this._appRef.attachView(componentRef.hostView);

    const id = this.getLastUniqueId;
    const destroy = () => {
      try {
        this._appRef.detachView(componentRef.hostView);
      } catch {
        // no-op
      }
      componentRef.destroy();
      const el = this._document.getElementById(id);
      if (el && el.parentNode) {
        el.parentNode.removeChild(el);
      }
    };

    return { componentRef, id, destroy };
  }

  private _createPaneElement(): HTMLElement {
    const pane = this._document.createElement('div');
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    pane.id = `${NOTIFIER + nextUniqueId++}`;
    this._notifierContainerService.getContainerElement().appendChild(pane);
    return pane;
  }

  get getLastUniqueId() {
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    return `${NOTIFIER + (nextUniqueId - 1)}`;
  }
}
