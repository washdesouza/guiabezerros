import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, Injectable, forwardRef } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { CategoriasPage } from '../pages/categorias/categorias';
import { PesquisarPage } from '../pages/pesquisar/pesquisar';
import { IonicStorageModule } from '@ionic/storage';
import { EmpresasPage } from '../pages/empresas/empresas';
import { VerempresaPage } from '../pages/verempresa/verempresa';
import { MapaPage } from '../pages/mapa/mapa';
import { Geolocation } from '@ionic-native/geolocation';
import { OfertaPage } from '../pages/oferta/oferta';
import { CupomPage } from '../pages/cupom/cupom';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    CategoriasPage,
    PesquisarPage,
    EmpresasPage,
    VerempresaPage,
    MapaPage,
    OfertaPage,
    CupomPage 

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    CategoriasPage,
    PesquisarPage,
    HomePage,
    EmpresasPage,
    VerempresaPage,
    MapaPage,
    OfertaPage,
    CupomPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Geolocation
    //AuthServiceProvider,
    //GoogleMapsProvider
  ]
})
export class AppModule {}
