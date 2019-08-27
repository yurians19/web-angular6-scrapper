import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { ComponentsRoutingModule, routedComponents } from './script-apps-gplay-routing.module';
import { ModalComponent } from './query-gplay-apps/modal/modal.component'
import { Modal_Component } from './find-gplay-apps/modal/modal.component'
import { ModalResultComponent } from './query-gplay-apps/modal-result/modal-result.component'
const components = [
  ModalComponent,Modal_Component
];
@NgModule({
  imports: [
    ThemeModule,
    ComponentsRoutingModule,
  ],
  declarations: [
    ...routedComponents,
    ...components,
    
  ],
  entryComponents: [
    ...components,
  ]
})
export class ScriptAppsGplayModule { }
