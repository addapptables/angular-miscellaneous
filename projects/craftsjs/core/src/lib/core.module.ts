import { NgModule } from '@angular/core';
import { ReduxRegisterModule } from '@craftsjs/ngrx-action';
import { DynamicDirective } from './dynamic.directive';
import { ResponsiveStore } from './stores/responsive.store';
import { ResponsiveService } from './services/responsive.service';
@NgModule({
  imports: [
    // Keep compatibility with ReduxRegisterModule
    ReduxRegisterModule.forFeature('responsive', { responsive: ResponsiveStore }),
    // import standalone directive
    DynamicDirective
  ],
  declarations: [],
  exports: [
    DynamicDirective
  ],
  providers: [
    ResponsiveService
  ]
})
export class CoreModule { }
