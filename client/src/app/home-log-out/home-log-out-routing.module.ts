import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeLogOutPage } from './home-log-out.page';

const routes: Routes = [
  {
    path: '',
    component: HomeLogOutPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeLogOutPageRoutingModule {}
