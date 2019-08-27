import { Component, OnInit,ViewChild,ChangeDetectionStrategy, } from '@angular/core';
declare var $;
import { ScriptAppsGplayService } from '../../../services/script-apps-gplay/script-apps-gplay.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from './modal/modal.component';
/* import {  NbWindowService,NbWindowRef } from '@nebular/theme';*/
import { ModalResultComponent } from './modal-result/modal-result.component'; 
import { api } from '../../../services/api-script-url.service';
@Component({
  selector: 'ngx-query-gplay-apps',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './query-gplay-apps.component.html',
  styleUrls: ['./query-gplay-apps.component.scss'],
  //providers: [NbWindowRef]
})
export class QueryGplayAppsComponent implements OnInit {
  public extractsLink : string = null
  public keyword : string = null
  public extractsLinkArray: any
  public extractsContentArray: any
  public appsRsultArray: any
  public query: any
  public queryContent: any
  public contentForm: boolean = true
  public contentDT: boolean = false
  public loading: boolean = false

  url: any;
  @ViewChild('dataTable') table;
  @ViewChild('dataTableContent') tableContent;
  dataTable: any;
  dtOption: any = {};
  dataTableContent: any;
  dtOptionContent: any = {};
  extractsContent: any;
  contentFormContent: boolean = true;
  contentDTContent: boolean = false;
  keywordContent: any;
  dataSet: any;
  selectedItem: string;
  constructor(public scriptAppsGplayService: ScriptAppsGplayService,
              private modalService: NgbModal,
              /* protected windowRef: NbWindowRef,
              private modalWindowService: NbWindowService, */
    ) { 
      this.url = api.url
      this.extractsLinkArray = new Array<any>();
      this.dataSet = new Array<any>();
      this.extractsContentArray = new Array<any>(); 
      this.appsRsultArray = new Array<any>(); 
      this.query = new Array<any>(); 
      this.queryContent = new Array<any>(); 
      this.selectedItem = '0';
    }
    ngOnInit() {
      /* this.initDataTable()
      this.contentDT = true
      this.contentForm = false */
    }
    addExtractsLink() {
      if (this.extractsLink) {
        this.extractsLinkArray.push(this.extractsLink)
        this.extractsLink = '';
      }
    }
    addExtractsContent() {
      if (this.extractsContent) {
        this.extractsContentArray.push(this.extractsContent)
        this.extractsContent = '';
      }
    }
    deleteExtractsContent(positionArray) {
      this.extractsContentArray.splice(positionArray, 1);
    }
    getScriptAppsGplay(){
        if (this.keyword && this.extractsLinkArray.length > 0) {
          this.contentForm = false
          this.contentDT = true
          $("#tableId").show();
          this.initDataTable()
      } else{
        this.showSmallModal()
      }
    }
    getScriptAppsGplayContent(){
        if (this.keywordContent && this.extractsContentArray.length > 0/*  && this.selectedItem !== '0' */) {
          this.contentFormContent = false
          this.contentDTContent = true
          this.getAppsGplayContent()
      } else{
        this.showSmallModal()
      }
    }
    getAppsGplayContent(){
          let array = []
          let response 
          this.scriptAppsGplayService.getAppsGplayContent(this.keywordContent,this.extractsContentArray/* ,this.selectedItem */).subscribe(result => {
            response = result
            console.log(response);
            response.forEach(element => {
              for (const key in element) {
                if (element.hasOwnProperty(key)) {
                  array.push(element[key])
                }
              }
              this.dataSet.push(array)
              array = []
            });
            
            $("#tableIdContent").show();
            this.initDataTableContent()
          },
            error => console.log('error',error)
          );
    }
    showSmallModal() {
      const activeModal = this.modalService.open(ModalComponent, { size: 'sm', container: 'nb-layout' });
      activeModal.componentInstance.modalHeader = 'Mensaje';
      activeModal.componentInstance.modalContent = `Debe completar los campos.`;
    }
    showDetailModal(data) {
      const activeModal = this.modalService.open(ModalResultComponent, { size: 'lg', container: 'nb-layout' });
      activeModal.componentInstance.modalHeader = 'Detalle de App';
      activeModal.componentInstance.modalContent = data;
    }
    showDetailModalContent(data) {
      const activeModal = this.modalService.open(ModalResultComponent, { size: 'lg', container: 'nb-layout' });
      activeModal.componentInstance.modalHeader = 'Detalle de App';
      activeModal.componentInstance.modalContent = data;
    }
    
    initDataTableContent() {
            
            this.dtOptionContent = {
              data: this.dataSet,
              columns: [
                { title: "URL PP" },
                { title: "TITLE" },
                { title: "URL PLAYSTORE","visible": false },
                { title: "DEVELOPER" },
                { title: "APP ID" },
                  {
                    title: 'ACTION',
                    "className":      'details-control',
                    "orderable":      false,
                    "data":           null,
                    "defaultContent": `<i class='ion-eye' title='Ver detalle' id='detail'
                                          style="color: blue;font-size: 25px"
                                        ></i>
                                        <i id='playStore' class='ion-android-playstore' title='Ver en la tienda'
                                        style="color: green;font-size: 25px"
                                        ></i>`
                  }
              ],
              rowCallback: (row: Node, data: any[] | Object, index: number) => {
                  this.queryContent.push(data)
                  let iPlay = $('td:nth-child(5)', row).find("#playStore")
                  let iDetail = $('td:nth-child(5)', row).find("#detail")
                  iPlay.on('click', () => {
                    window.open(data[2]);
                  }); 
                  iDetail.on('click', () => {
                    console.log(data);
                    
                    this.showDetailModalContent(data);
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
        this.dataTableContent = $(this.tableContent.nativeElement);
        this.dataTableContent.DataTable(this.dtOptionContent);
    }

    initDataTable() {
          let data = this.extractsLinkArray
            this.dtOption = {
              "ajax": {
                url: `${this.url}apps-gplay-link/${this.keyword}`/* ${this.keyword} Música de los años 70, 80 y 90*/,
                type: 'GET',
                dataSrc: "",
                data: function ( d ) {
                  //d.extractsContent = ['User Provided Information' ,'This privacy policy governs your use of the software application of this App for mobile devices that was created by our company.' ]/* data */
                  d.extractsLink= /* ['herokuapp.com' ,'privacypolicy.html' ] */data
              }
              },
              columns: [
                  {
                    title: 'DEVELOPER',
                      data: 'developer'
                  },
                  {
                      title: 'TITLE',
                      data: 'title'
                  },
                  {
                      title: 'APP ID',
                      data: 'appId'
                  },
                  {
                      title: 'URL PP',
                      data: 'privacyPolicy'
                  },
                  {
                      title: 'URL PLAYSTORE',
                      data: 'url',
                      visible: false
                  },
                  {
                    title: 'ACTION',
                    "className":      'details-control',
                    "orderable":      false,
                    "data":           null,
                    "defaultContent": `<i class='ion-eye' title='Ver detalle' id='detail'
                                          style="color: blue;font-size: 25px"
                                        ></i>
                                        <i id='playStore' class='ion-android-playstore' title='Ver en la tienda'
                                        style="color: green;font-size: 25px"
                                        ></i>`
                  }
              ],
              rowCallback: (row: Node, data: any[] | Object, index: number) => {
                  this.query.push(data)
                  let iPlay = $('td:nth-child(5)', row).find("#playStore")
                  let iDetail = $('td:nth-child(5)', row).find("#detail")
                  iPlay.on('click', () => {
                    window.open(data['url']);
                  }); 
                  iDetail.on('click', () => {
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
    hiddenTable(){
      this.contentDT = false
      this.contentForm = true
      $("#tableId").hide();
      this.extractsLinkArray = [];
      this.keyword = '';
      var table = this.dataTable.DataTable();
      table.clear().draw();
      table.destroy();
    }
    resetform(){
      this.keywordContent = '';
      this.extractsContentArray = [];
    }
    hiddenTableContent(){
      $("#tableIdContent").hide();
      this.keywordContent = '';
      this.extractsContentArray = [];
      this.dataSet = [];
      this.contentDTContent = false
      this.contentFormContent = true
      var table = this.dataTableContent.DataTable();
      table.clear().draw();
      table.destroy();
    }
    saveQueryAppsGplay(typeQuery){
      let pos = false
      let type = null
      let keyword = null
      let query = null
      if (typeQuery=='link') {
        type = 'link'
        keyword = this.keyword
        query = this.query
        if (this.query.length>0) 
            pos = true
      } else {
        type = 'content'
        keyword = this.keywordContent
        query = this.queryContent
        if (this.queryContent.length>0) 
            pos = true
      }
      if (pos) {
        if (confirm("Desea guardar esta busqueda?")) {
          this.loading = true
          this.scriptAppsGplayService.saveQueryAppsGplay(keyword,query,type).subscribe(result => {
            console.log(result);
            alert('Busqueda guardada con exito!!')
          },
            error => console.log('error',error),
            () => this.loading = false
          );
        }
      } else{
        alert('No hay apps para guardar')
      }
  }
  
    
  /* modalWindow() {
    this.modalWindowService.open(ModalResultComponent, 
      { title: `Listado de Apps Resultantes`,
      context: { appsRsult: 'this.appsRsultArray' } 
      });
  } */
 /*  minimize() {
  this.windowRef.minimize();
}

close() {
  this.windowRef.close(); 
}*/

}
