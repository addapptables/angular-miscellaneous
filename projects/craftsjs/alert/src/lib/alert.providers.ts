import { EnvironmentProviders, importProvidersFrom, makeEnvironmentProviders } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { AlertService } from './services/alert.service';

/**
 * Standalone provider for CraftsJS Alert.
 * - Provides MatDialog infrastructure and AlertService.
 */
export function provideCraftsjsAlert(): EnvironmentProviders {
  return makeEnvironmentProviders([
    importProvidersFrom(MatDialogModule),
    AlertService
  ]);
}
