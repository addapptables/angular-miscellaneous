import { Component, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'alert-ok-button',
  templateUrl: './alert-ok-button.component.html',
  styleUrls: ['./alert-ok-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [MatButtonModule, TranslateModule]
})
export class AlertOkButtonComponent {
  @Output()
  click = new EventEmitter();
}
