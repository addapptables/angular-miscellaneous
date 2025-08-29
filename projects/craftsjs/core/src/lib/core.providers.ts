import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { provideReduxRegisterFeature } from '@craftsjs/ngrx-action';
import { ResponsiveStore } from './stores/responsive.store';
import { ResponsiveService } from './services/responsive.service';

/**
 * Standalone provider to register the CraftsJS Core responsive feature store.
 * Feature key: 'responsive', slice: { responsive: ResponsiveStore }
 */
export function provideCraftsjsCore(): EnvironmentProviders {
  return makeEnvironmentProviders([
    provideReduxRegisterFeature('responsive', { responsive: ResponsiveStore }),
    ResponsiveService,
  ]);
}
