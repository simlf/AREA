import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateIntegrationPage } from './create-integration.page';

const routes: Routes = [
  {
    path: '',
    component: CreateIntegrationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateIntegrationPageRoutingModule {}
