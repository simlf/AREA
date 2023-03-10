import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ConfigIntegrationPageRoutingModule } from './config-integration-routing.module';
import { ConfigIntegrationPage } from './config-integration.page';
import { integrationComponent } from './card/card.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HttpClientModule,
    ConfigIntegrationPageRoutingModule
  ],
  declarations: [ConfigIntegrationPage, integrationComponent]
})
export class ConfigIntegrationPageModule {}
