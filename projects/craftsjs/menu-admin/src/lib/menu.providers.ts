import { EnvironmentProviders } from '@angular/core';
import { provideReduxRegisterFeature } from '@craftsjs/ngrx-action';
import { MenuStore } from './store/menu.store';

/**
 * Standalone provider to register the CraftsJS Menu feature store.
 * Feature key: 'craftsjsmenu', slice: { sidebar: MenuStore }
 */
export function provideCraftsjsMenu(): EnvironmentProviders {
  return provideReduxRegisterFeature('craftsjsmenu', { sidebar: MenuStore });
}
