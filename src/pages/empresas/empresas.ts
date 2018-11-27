import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Segment } from 'ionic-angular';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import { Storage } from '@ionic/storage';
import { VerempresaPage } from '../verempresa/verempresa';


@IonicPage()
@Component({
  selector: 'page-empresas',
  templateUrl: 'empresas.html',
})
export class EmpresasPage {

  id : number;
  public empresas:any;
  key:string = 'empresas';

  
  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage, public http: HttpClient) {
    
    this.getData(this.navParams.get('id'));

    this.loadData(this.navParams.get('id'));

  }
  ionViewDidLoad() {
    this.id = this.navParams.get('id');
   // console.log(this.id);
  }

  loadData(id){
    this.storage.get(this.key + id).then((val) => {
      if(val !=null && val != undefined){
        this.empresas = JSON.parse(val);
      }
    });
  }

  getData(id){
   
    let url = 'https://app.agreste360graus.com.br/bezerros/index.php?component=json&action=empresasitem&cat='+id;
    let data: Observable<any> = this.http.get(url);
    data.subscribe(result => {
    this.empresas = result;  
    this.storage.set(this.key + id, JSON.stringify(this.empresas)); 
  // console.log(this.empresas);
     
    });
  }

  irVerEmpresa(id: number){
    this.navCtrl.push(VerempresaPage, {id});
  }

  irHome(){

    this.navCtrl.popToRoot();
  
  }

}
