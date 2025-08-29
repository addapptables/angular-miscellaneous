import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { NotifierService } from './services/notifier.service';
import { NotifierPortalService } from './services/notifier-portal.service';
import { BottomLeftStrategy } from './strategies/bottom-left.strategy';
import { BottomRightStrategy } from './strategies/bottom-right.strategy';
import { TopLeftStrategy } from './strategies/top-left.strategy';
import { TopRightStrategy } from './strategies/top-right.strategy';
import { NotifierConfiguration } from './models/notifier-configuration.model';
import { ADDAPPTABLE_CONFIGURATION_NOTIFIER_DATA } from './tokens';
import { NotifierPositionType } from '../public-api';

export function provideCraftsjsNotifier(config: NotifierConfiguration= {
    position: NotifierPositionType.bottomRight,
    timeout: 5000,
    classIcon: 'material-icons',
    iconValue: 'notifications'
  }): EnvironmentProviders {
  return makeEnvironmentProviders([
    NotifierService,
    NotifierPortalService,
    BottomLeftStrategy,
    BottomRightStrategy,
    TopLeftStrategy,
    TopRightStrategy,
    { provide: ADDAPPTABLE_CONFIGURATION_NOTIFIER_DATA, useValue: config }
  ]);
}
