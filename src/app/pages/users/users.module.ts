import { NgModule } from '@angular/core';

import { ThemeModule } from './../../@theme/theme.module';
import { UsersComponent } from './users.component'
/* import { ModalComponent } from './modal/modal.component'
import { ModalResultComponent } from './modal-result/modal-result.component' */
const components = [
  UsersComponent,
];
@NgModule({
  imports: [
    ThemeModule,
  ],
  declarations: [
    ...components,
  ],
  entryComponents: [
    ...components,
  ]
})
export class UsersModule { }
