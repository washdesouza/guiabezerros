import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Storage } from '@ionic/storage';


declare var google:any;


@IonicPage()
@Component({
  selector: 'page-mapa',
  templateUrl: 'mapa.html',
})
export class MapaPage {
  longcliente: any;
  latcliente: any;
  map: any;
 /* markers: any;

  estabelecimento = [{
    nome: 'minha localiacao' ,
    lat: -53.6456,
    lng: -45.4566

  }] */
  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer({
    draggable: true
  });
  //map: any;
  startPosition: any;
  originPosition: string;
  destinationPosition: string;
  inicio :any = new google.maps.LatLng(localStorage.getItem('latcliente'), localStorage.getItem('longcliente'));
  empresa :any = new google.maps.LatLng(localStorage.getItem('lat'), localStorage.getItem('log'));

  constructor(public navCtrl: NavController, public navParams: NavParams, private platform: Platform, public geolocation: Geolocation, public storage: Storage) {
  }


  ionViewDidLoad() {
    this.geolocation.getCurrentPosition().then((resp) => {
      var a:any = resp.coords.latitude;
      var b:any = resp.coords.longitude;
         localStorage.setItem('latcliente', a);
         localStorage.setItem('longcliente', b);
      // resp.coords.longitude
     }).catch((error) => {
       console.log('Error getting location', error);
     });

    this.initializeMap();
  }
 
  initializeMap() {
    this.startPosition = new google.maps.LatLng(localStorage.getItem('lat'), localStorage.getItem('log'));
    
    const mapOptions = {
      zoom: 18,
      center: this.startPosition,
      disableDefaultUI: true
    }
 
    this.map = new google.maps.Map(document.getElementById('map'), mapOptions);
    this.directionsDisplay.setMap(this.map);
 
    const marker = new google.maps.Marker({
      position: this.startPosition,
      map: this.map,
    });
  }
 
  calculateRoute() {
    if (this.inicio && this.empresa) {
      const request = {
        // Pode ser uma coordenada (LatLng), uma string ou um lugar
        origin: this.inicio,
        destination: this.empresa,
        travelMode: 'DRIVING',
        provideRouteAlternatives: true
      };
 
      this.traceRoute(this.directionsService, this.directionsDisplay, request);
    }
  }
 
  traceRoute(service: any, display: any, request: any) {
    service.route(request, function (result, status) {
      if (status == 'OK') {
        display.setDirections(result);
      }
    });
  }
}
