import { Directive } from '@angular/core';

@Directive({
  selector: 'modal-footer, [modal-footer], [craftsjsModalFooter]',
  host: { class: 'modal-footer' },
  standalone: true
})
export class ModalFooterDirective { }
