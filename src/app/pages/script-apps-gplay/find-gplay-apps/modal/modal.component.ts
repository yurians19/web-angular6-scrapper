import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngx-modal',
  template: `
                <div class="modal-header">
                <span>{{ modalHeader }}</span>
                <button class="close" aria-label="Close" (click)="closeModal()">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                  <p><b>KEYWORD: </b> {{modalContent.keyword}}</p>
                  <p><b>FECHA: </b>{{modalContent.date}}</p>
                  <p><b>Codigo: </b> {{modalContent._id}}</p>
              <h4>Listado de Apps:</h4>
                  <table>
                        <tr>
                          <th>developer</th>
                          <th>title</th>
                          <th>appId</th>
                          <th>privacyPolicy</th>
                        </tr>
                        <tr *ngFor="let query of modalContent.query">
                          <td *ngIf="query.developer !== undefined">{{query.developer}}</td>
                          <td *ngIf="query.title !== undefined">{{query.title}}</td>
                          <td *ngIf="query.appId !== undefined">{{query.appId}}</td>
                          <td *ngIf="query.privacyPolicy !== undefined">{{query.privacyPolicy}}</td>

                          <td *ngIf="query[3] !== undefined"> {{query[3]}}</td>
                          <td *ngIf="query[1] !== undefined"> {{query[1]}}</td>
                          <td *ngIf="query[4] !== undefined">{{query[4]}}</td>
                          <td *ngIf="query[0] !== undefined"> {{query[0]}}</td>
                        </tr>


                    </table>
              </div>
              <div class="modal-footer">
                <button class="btn btn-md btn-primary" (click)="closeModal()">Salir</button>
              </div>
            `,
})
export class Modal_Component {

  modalHeader: string;
  modalContent: any;

  constructor(private activeModal: NgbActiveModal) { 
    console.log(this.modalContent);
    

  }

  closeModal() {
    this.activeModal.close();
  }
}
