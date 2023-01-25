import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LandingpagePage } from './landingpage.page';

const routes: Routes = [
  {
    path: '',
    component: LandingpagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LandingpagePageRoutingModule {}
