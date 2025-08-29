import { EnvironmentProviders, makeEnvironmentProviders, importProvidersFrom } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { CRAFTSJS_MODAL_CONFIG } from './tokens';
import { ModalConfig } from './models/modal-config.model';
import { ModalService } from './services/modal.service';

/**
 * Standalone providers for CraftsJS Modal.
 * Use in Angular 15+ standalone apps instead of ModalModule.forRoot().
 */
export function provideCraftsjsModal(config: ModalConfig = { width: '800px' }): EnvironmentProviders {
  return makeEnvironmentProviders([
    importProvidersFrom(MatDialogModule),
    { provide: CRAFTSJS_MODAL_CONFIG, useValue: config },
    ModalService
  ]);
}
