import { Component, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'alert-cancel-button',
  templateUrl: './alert-cancel-button.component.html',
  styleUrls: ['./alert-cancel-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [MatButtonModule, TranslateModule]
})
export class AlertCancelButtonComponent {
  @Output()
  click = new EventEmitter();
}
