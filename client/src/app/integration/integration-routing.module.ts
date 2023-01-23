import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IntegrationPage } from './integration.page';

const routes: Routes = [
  {
    path: '',
    component: IntegrationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IntegrationPageRoutingModule {}
