import { Injectable, Injector, Inject } from '@angular/core';
import { NotifierPortalService } from './notifier-portal.service';
import { NotifierComponent } from '../notifier.component';
import { DOCUMENT } from '@angular/common';
import { NotifierRef } from '../notifier-ref';
import { Notifier } from '../models/notifier.model';
import { NotifierConfiguration } from '../models/notifier-configuration.model';
import { ADDAPPTABLE_CONFIGURATION_NOTIFIER_DATA, ADDAPPTABLE_NOTIFIER_DATA } from '../tokens';
import { NotifierPositionType } from '../models/notifier-position-enum.model';
import { BottomRightStrategy } from '../strategies/bottom-right.strategy';
import { Strategy } from '../strategies/strategy';
import { TopRightStrategy } from '../strategies/top-right.strategy';
import { BottomLeftStrategy } from '../strategies/bottom-left.strategy';
import { TopLeftStrategy } from '../strategies/top-left.strategy';
import { NotifierType } from '../models/notifier-type.model';

@Injectable()
export class NotifierService {

  defaultConfiguration: NotifierConfiguration = {
    position: NotifierPositionType.bottomRight,
    timeout: 5000,
    classIcon: 'material-icons',
    iconValue: 'notifications'
  };

  constructor(
    private _notifierPortalService: NotifierPortalService,
    private _injector: Injector,
    @Inject(DOCUMENT) private _document: Document,
    @Inject(ADDAPPTABLE_CONFIGURATION_NOTIFIER_DATA) configuration: NotifierConfiguration
  ) {
    this.defaultConfiguration = Object.assign(this.defaultConfiguration, configuration);
  }

  openSuccess(message: string, configuration: NotifierConfiguration = <NotifierConfiguration>{}): NotifierRef {
    return this.open({ message: message, type: NotifierType.success }, configuration);
  }

  openError(message: string, configuration: NotifierConfiguration = <NotifierConfiguration>{}): NotifierRef {
    return this.open({ message: message, type: NotifierType.danger }, configuration);
  }

  openInfo(message: string, configuration: NotifierConfiguration = <NotifierConfiguration>{}): NotifierRef {
    return this.open({ message: message, type: NotifierType.info }, configuration);
  }

  openWarning(message: string, configuration: NotifierConfiguration = <NotifierConfiguration>{}): NotifierRef {
    return this.open({ message: message, type: NotifierType.warning }, configuration);
  }

  open(data: Notifier, configuration: NotifierConfiguration = <NotifierConfiguration>{}): NotifierRef {
    const elementInjector = this._createElementInjector(data);
    const { componentRef, id, destroy } = this._notifierPortalService.attachComponent(NotifierComponent, elementInjector);
    const notifierRef = new NotifierRef(componentRef.instance, id, destroy);
    const mergeConfiguration = Object.assign(this.defaultConfiguration, configuration);
    this._factoryStrategy(mergeConfiguration).newNotifier(notifierRef);
    return notifierRef;
  }

  private _factoryStrategy(configuration: NotifierConfiguration): Strategy {
    switch (configuration.position) {
      case NotifierPositionType.bottomRight:
        return this._injector.get(BottomRightStrategy);
      case NotifierPositionType.bottomLeft:
        return this._injector.get(BottomLeftStrategy);
      case NotifierPositionType.topLeft:
        return this._injector.get(TopLeftStrategy);
      case NotifierPositionType.topRight:
        return this._injector.get(TopRightStrategy);
      default:
        return this._injector.get(BottomRightStrategy);
    }
  }

  private _createElementInjector(data: any): Injector {
    return Injector.create({
      providers: [{
        provide: ADDAPPTABLE_NOTIFIER_DATA,
        useValue: data
      }],
      parent: this._injector
    });
  }
}
