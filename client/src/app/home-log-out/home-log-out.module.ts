import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeLogOutPageRoutingModule } from './home-log-out-routing.module';

import { HomeLogOutPage } from './home-log-out.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeLogOutPageRoutingModule
  ],
  declarations: [HomeLogOutPage]
})
export class HomeLogOutPageModule {}
