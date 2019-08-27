import { Component, OnInit,ViewChild } from '@angular/core';
declare var $;
import { ScriptAppsGplayService } from '../../../services/script-apps-gplay/script-apps-gplay.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { api } from '../../../services/api-script-url.service';
import { Modal_Component } from './modal/modal.component';
@Component({
  selector: 'ngx-find-gplay-apps',
  templateUrl: './find-gplay-apps.component.html',
  styleUrls: ['./find-gplay-apps.component.scss']
})
export class FindGplayAppsComponent implements OnInit {
  url: any;
  @ViewChild('dataTable') table;
  dataTable: any;
  dtOption: any = {};
  constructor(public scriptAppsGplayService: ScriptAppsGplayService,
    private modalService: NgbModal,) { 
      this.url = api.url
    }

  ngOnInit() {
    this.initDataTable()
  }
  initDataTable() {
      this.dtOption = {
        "ajax": {
          url: `${this.url}find-apps-gplay`,
          type: 'GET',
          dataSrc: "",
          /* data: function ( d ) {
            d.extractsLink = data
        } */
        },
        columns: [
            {
              title: 'KEYWORD',
                data: 'keyword'
            },
            {
                title: 'FECHA',
                data: 'date'
            },
            {
                title: 'Tipo',
                data: 'typeQuery'
            },
            {
              title: 'ACTION',
              "className":      'details-control',
              "orderable":      false,
              "data":           null,
              "defaultContent": `<i class='ion-eye' title='Ver detalle' id='detail'
                                    style="color: blue;font-size: 25px"
                                  ></i>
                                  <!-- <i id='delete' class='ion-trash-b' title='eliminar'
                                  style="color: black;font-size: 25px"
                                  ></i> -->`
            }
        ],
        rowCallback: (row: Node, data: any[] | Object, index: number) => {
            let iDelete = $('td:nth-child(4)', row).find("#delete")
            let iDetail = $('td:nth-child(4)', row).find("#detail")
            iDelete.on('click', () => {
              this.deleteQuery(data['_id']);
            }); 
            iDetail.on('click', () => {
              console.log('data',data);
              this.showDetailModal(data);
            }); 
          return row;
        },
        /* initComplete: function(settings,appsresult){
          const self = this;
          $("#tableId").on("click", "i", function(){
            var $row = $(this).closest("tr"),
            $tds = $row.find("td:nth-child(3)");
            const data = appsresult.find(app => app.appId == $tds.text())
            const id = $(this).attr("id")
                if (id === 'playStore') {
                  window.open(data.url);
                }else{ 
                  console.log('hola');
                  self.showDetailModal(data);    
                }
            });
        }, */
        pageLength: 10,
        pagingType: 'full_numbers',
        dom: 'lBfrtip',
        buttons: [
          {
              extend: 'print',
              text: 'IMPRIMIR',
              title:  'LISTADO DE APPS POR EXTRACTO DE URL DE POLITICA DE PRIVACIDAD',
            message: 'ESTE ES EL MENSAJE CENTRAL',
            messageBottom: 'ESTE ES EL MENSAJE DE INFERIOR',
              customize: function ( win ) {
                  $(win.document.body)
                      .css( 'font-size', '13pt' )
                      .prepend(
                          '<img src="http://datatables.net/media/images/logo-fade.png" style="position:absolute; top:0; left:0;" />'
                      );
  
                  $(win.document.body).find( 'table' )
                      .addClass( 'compact' )
                      .css({ color: 'black',
                      margin: '5px'} );
              }
          }
      ],
        'language': {
          'lengthMenu': 'Mostrar _MENU_ registros',
          'zeroRecords': 'Ningun elemento encontrado',
          'infoEmpty': 'No hay registros disponibles',
          'infoFiltered': '(filtrado de _MAX_ registros totales)',
          'search': 'Búsqueda:',
          'info':           'Mostrando _START_ - _END_ de _TOTAL_ registros',
          'loadingRecords': 'Cargando...',
          'processing':     'Procesando...',
          'paginate': {
                                  'first':      'Primera',
                                  'last':       'Última',
                                  'next':       'Sig',
                                  'previous':   'Ant'
                      }
      }
    }
  this.dataTable = $(this.table.nativeElement);
  this.dataTable.DataTable(this.dtOption);
}
      showDetailModal(data) {
        const activeModal = this.modalService.open(Modal_Component, { size: 'lg', container: 'nb-layout' });
        activeModal.componentInstance.modalHeader = 'Detalle de Busqueda almacenada';
        activeModal.componentInstance.modalContent = data;
      }
      deleteQuery(_id){
        if (confirm("Desea eliminar esta busqueda?")) {
            this.scriptAppsGplayService.deleteQuery(_id).subscribe(result => {
              console.log(result);
              var table = this.dataTable.DataTable();
              table.clear().draw();
              table.destroy();
              this.dataTable.css("display", "none");
              this.initDataTable()
            },
            error => console.log('error',error)
          );
        }
      }

}
