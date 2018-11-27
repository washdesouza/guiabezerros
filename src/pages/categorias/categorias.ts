
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Segment, ModalController, ViewController } from 'ionic-angular';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import { Storage } from '@ionic/storage';
import { EmpresasPage } from '../empresas/empresas';
import { VerempresaPage } from '../verempresa/verempresa';


@IonicPage()
@Component({
  selector: 'page-categorias',
  templateUrl: 'categorias.html',
})
export class CategoriasPage {

  id : number;
  public categorias:any;
  key:string = 'categorias';
  banners:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient,private storage: Storage, private modal: ModalController, private view:ViewController) {
  
    this.getbanner();
    this.getData(this.navParams.get('id'));   
    this.loadData(this.navParams.get('id'));

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CategoriasPage');
  }

  abrirModal(){

    const myModal = this.modal.create('ModalpagePage');
    myModal.present();

  }

  irEmpresaPatrocinio(id){
    this.navCtrl.push(VerempresaPage, {id});
  }
  
  loadData(id){
    this.storage.get(this.key + id).then((val) => {
      if(val !=null && val != undefined){
        this.categorias = JSON.parse(val);
      }
    });
  }
 
  getData(id){
   
    let url = 'https://app.agreste360graus.com.br/bezerros/index.php?component=json&action=categorias&id='+id;
    let data: Observable<any> = this.http.get(url);
    data.subscribe(result => {
    this.categorias = result;  
    this.storage.set(this.key + id, JSON.stringify(this.categorias)); 
   //console.log(this.categorias);
     
    });
}

getbanner(){
   
  let url = 'https://app.agreste360graus.com.br/bezerros/index.php?component=json&action=banner';
  let data: Observable<any> = this.http.get(url);
  data.subscribe(result => {
  this.banners = result;  
 //console.log(this.categorias);
   
  });
}

irEmpresa(id: number){
  this.navCtrl.push(EmpresasPage, {id});
}

irHome(){
 // this.navCtrl.setRoot(HomePage);

  this.navCtrl.popToRoot();


}

}
