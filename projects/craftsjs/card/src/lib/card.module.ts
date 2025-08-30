import { NgModule } from '@angular/core';
import { CardComponent } from './card.component';
import { CardHeaderComponent } from './components/card-header/card-header.component';
import { CardHeaderLinearComponent } from './components/card-header/components/card-header-linear/card-header-linear.component';
import { CardHeaderOvalComponent } from './components/card-header/components/card-header-oval/card-header-oval.component';
import { CardBodyDirective } from './directives/card-body.directive';
import { CardDividerDirective } from './directives/card-divider.directive';
import { CardFooterDirective } from './directives/card-footer.directive';
import { CardHeaderMarkDirective } from './directives/card-header-mark.directive';
import { CardHeaderSubtitleDirective } from './directives/card-header-subtitle.directive';
import { CardTitleDirective } from './directives/card-title.directive';

@NgModule({
  imports: [
    CardComponent,
    CardHeaderComponent,
    CardHeaderLinearComponent,
    CardHeaderOvalComponent,
    CardBodyDirective,
    CardDividerDirective,
    CardFooterDirective,
    CardHeaderMarkDirective,
    CardHeaderSubtitleDirective,
    CardTitleDirective
  ],
  exports: [
    CardComponent,
    CardHeaderComponent,
    CardHeaderLinearComponent,
    CardHeaderOvalComponent,
    CardBodyDirective,
    CardDividerDirective,
    CardFooterDirective,
    CardHeaderMarkDirective,
    CardHeaderSubtitleDirective,
    CardTitleDirective
  ]
})
export class CardModule { }
