import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LandingpagePageRoutingModule } from './landingpage-routing.module';
import { IntegrationListComponent } from './card.component';

import { LandingpagePage } from './landingpage.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LandingpagePageRoutingModule
  ],
  declarations: [LandingpagePage, IntegrationListComponent]
})
export class LandingpagePageModule {}
