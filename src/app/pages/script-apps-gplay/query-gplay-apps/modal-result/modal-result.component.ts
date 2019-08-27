import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'result-modal',
  template: `<div class="modal-header">
                <span>{{ modalHeader }}</span>
                <button class="close" aria-label="Close" (click)="closeModal()">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                  <p *ngIf="modalContent.developer !== undefined"><strong>DEVELOPER: </strong> {{modalContent.developer}}</p>
                  <p *ngIf="modalContent[3] !== undefined"><strong>DEVELOPER: </strong> {{modalContent[3]}}</p>
                  <p *ngIf="modalContent.title !== undefined"><b>TITLE: </b> {{modalContent.title}}</p>
                  <p *ngIf="modalContent[1] !== undefined"><b>TITLE: </b> {{modalContent[1]}}</p>
                  <p *ngIf="modalContent.appId !== undefined"><b>APP ID: </b>{{modalContent.appId}}</p>
                  <p *ngIf="modalContent[4] !== undefined"><b>APP ID: </b>{{modalContent[4]}}</p>
                  <p *ngIf="modalContent.privacyPolicy !== undefined"><b>URL PP: </b> {{modalContent.privacyPolicy}}</p>
                  <p *ngIf="modalContent[0] !== undefined"><b>URL PP: </b> {{modalContent[0]}}</p>
                  <p *ngIf="modalContent.url !== undefined"><b>URL PLAYSTORE: </b> {{modalContent.url}}</p>
                  <p *ngIf="modalContent[2] !== undefined"><b>URL PLAYSTORE: </b> {{modalContent[2]}}</p>
              </div>
              <div class="modal-footer">
                <button class="btn btn-md btn-primary" (click)="closeModal()">Salir</button>
              </div>
              `,
})
export class ModalResultComponent {

  modalHeader: string;
  modalContent: any;

  constructor(private activeModal: NgbActiveModal) {
   }

  closeModal() {
    this.activeModal.close();
  }
}
