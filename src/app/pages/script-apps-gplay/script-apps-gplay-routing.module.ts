import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ScriptAppsGplayComponent } from './script-apps-gplay.component';
import { FindGplayAppsComponent } from './find-gplay-apps/find-gplay-apps.component';
import { QueryGplayAppsComponent } from './query-gplay-apps/query-gplay-apps.component';

const routes: Routes = [{
  path: '',
  component: ScriptAppsGplayComponent,
  children: [
  {
    path: 'query-gplay-apps',
    component: QueryGplayAppsComponent,
  }, {
    path: 'find-gplay-apps',
    component: FindGplayAppsComponent,
  },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComponentsRoutingModule { }

export const routedComponents = [
    ScriptAppsGplayComponent,
    QueryGplayAppsComponent,
    FindGplayAppsComponent,
];
