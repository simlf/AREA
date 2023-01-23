import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateIntegrationPageRoutingModule } from './create-integration-routing.module';

import { CreateIntegrationPage } from './create-integration.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateIntegrationPageRoutingModule
  ],
  declarations: [CreateIntegrationPage]
})
export class CreateIntegrationPageModule {}
