import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AndroidApkComponent } from './android-apk/android-apk.component';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'integration',
    loadChildren: () => import('./integration/integration.module').then( m => m.IntegrationPageModule)
  },
  {
    path: 'signin',
    loadChildren: () => import('./connexion/connexion.module').then( m => m.ConnexionPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./inscription/inscription.module').then( m => m.InscriptionPageModule)
  },
  {
    path: 'create-integration',
    loadChildren: () => import('./create-integration/create-integration.module').then( m => m.CreateIntegrationPageModule)
  },
  {
    path: 'landingpage',
    loadChildren: () => import('./landingpage/landingpage.module').then( m => m.LandingpagePageModule)
  },
  {
    path: 'config-integration/:id',
    loadChildren: () => import('./config-integration/config-integration.module').then( m => m.ConfigIntegrationPageModule)
  },
  {
    path: 'config-integration',
    pathMatch: 'full',
    loadChildren: () => import('./config-integration/config-integration.module').then( m => m.ConfigIntegrationPageModule)
  },
  {
    path: 'client.apk',
    component: AndroidApkComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }
