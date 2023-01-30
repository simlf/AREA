import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfigIntegrationPage } from './config-integration.page';

const routes: Routes = [
  {
    path: '',
    component: ConfigIntegrationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfigIntegrationPageRoutingModule {}
