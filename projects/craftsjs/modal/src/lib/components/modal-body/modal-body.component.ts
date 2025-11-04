import { Component, ChangeDetectionStrategy, ViewEncapsulation, ViewChild, AfterViewInit, AfterViewChecked } from '@angular/core';
import { PerfectScrollbarDirective } from '@craftsjs/perfect-scrollbar';

import PerfectScrollbar from 'perfect-scrollbar';

@Component({
  selector: 'modal-body, [modal-body], [craftsjsModalBody]',
  templateUrl: './modal-body.component.html',
  styleUrls: ['./modal-body.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'modal-body'
  },
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [PerfectScrollbarDirective]
})
export class ModalBodyComponent implements AfterViewInit, AfterViewChecked { 

  @ViewChild(PerfectScrollbar)
  private ps: PerfectScrollbar;


  ngAfterViewInit() {
    this.ps?.update();
  }

  ngAfterViewChecked(): void {
    this.ps?.update();
  }

}
