import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IntegrationPageRoutingModule } from './integration-routing.module';

import { IntegrationPage } from './integration.page';

import { CardComponent } from './card/card.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IntegrationPageRoutingModule
  ],
  declarations: [IntegrationPage, CardComponent]
})
export class IntegrationPageModule {}
