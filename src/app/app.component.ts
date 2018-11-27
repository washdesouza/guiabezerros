import { Component, ViewChild } from '@angular/core';
import { Platform, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { CategoriasPage } from '../pages/categorias/categorias';
import { EmpresasPage } from '../pages/empresas/empresas';
import { VerempresaPage } from '../pages/verempresa/verempresa';
import { PesquisarPage } from '../pages/pesquisar/pesquisar';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;
  @ViewChild('nav') nav: NavController;
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

    //  var notificationOpenedCallback = function(jsonData) {
     //   console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
     // };

      // check if in browser or on device before running OneSignal Code
      if(platform.is('core') || platform.is('mobileweb')) {
        console.log("Platform is core or is mobile web");
      } else {
        var notificationOpenedCallback = function(jsonData) {
          console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));

          let seccion= JSON.parse(JSON.stringify(jsonData)).notification.payload.additionalData.seccion;
          let _id= JSON.parse(JSON.stringify(jsonData)).notification.payload.additionalData._id;
  
          switch (seccion){
            case "categoria":
              this.nav.setRoot(CategoriasPage,{_id: _id});
              break;
            case "empresas":
              this.nav.setRoot(EmpresasPage,{_id: _id});
              break;
            case "empresa":
              this.nav.setRoot(VerempresaPage,{_id: _id});
              break;
            case "pesquisa":
              this.nav.setRoot(PesquisarPage,{_id: _id});
              break;
          }


        };

        window["plugins"].OneSignal
        .startInit("ab1fc917-f329-4b76-af8a-8f816a058168", "641901537418")
        .handleNotificationOpened(notificationOpenedCallback)
        .endInit(); 

        
      }

   

    });
  }
}

