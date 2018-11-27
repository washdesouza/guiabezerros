import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import { Storage } from '@ionic/storage';


@IonicPage()
@Component({
  selector: 'page-oferta',
  templateUrl: 'oferta.html',
})
export class OfertaPage {

  public id : number;
  public items:any;
  public produtos:any;
 // public empresas:any;
  key:string = 'verempresa';

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient, private storage: Storage) {
    this.getData(this.navParams.get('id'));
    this.produtoss(this.navParams.get('id'));
   // this.getData(this.id);
   this.loadData(this.navParams.get('id'));
  }

  getData(id){
    let url = 'https://app.agreste360graus.com.br/bezerros/index.php?component=json&action=empresaitem&id='+ id;
    let data: Observable<any> = this.http.get(url);
    data.subscribe(result => {
    this.items = result;  
     
    });
  }

  produtoss(id){
    let url = 'https://app.agreste360graus.com.br/bezerros/index.php?component=json&action=produtos&id='+ id;
    let data: Observable<any> = this.http.get(url);
    data.subscribe(result => {
    this.produtos = result;  
     
    });
  }

  ionViewDidLoad() {
    this.id = this.navParams.get('id');
   // console.log(this.id);
 
  }
  
  loadData(id){
    this.storage.get(this.key + id).then((val) => {
      if(val !=null && val != undefined){
        this.items = JSON.parse(val);
      }
    });
  }


}
