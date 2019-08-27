import { NgModule } from '@angular/core';

import { ThemeModule } from '../../../@theme/theme.module';
import { Modal_Component } from './modal/modal.component';
const components = [
  Modal_Component,
];
@NgModule({
  imports: [
    ThemeModule,
  ],
  declarations: [
    /* ...components, */
  ],
  entryComponents: [
    /* ...components, */
  ]
})
export class FindGplayAppsModule { }
