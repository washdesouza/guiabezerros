import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Segment } from 'ionic-angular';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import { VerempresaPage } from '../verempresa/verempresa';

/**
 * Generated class for the PesquisarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pesquisar',
  templateUrl: 'pesquisar.html',
})
export class PesquisarPage {

  public pesquisa:any;
  public valor:any;
  public items:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient) {
    this.getData(this.navParams.data.valor.pesquisa);
  }

  ionViewDidLoad() {
    
    //this.pesquisar = this.navParams.get('pesquisar');
     
     this.valor = this.navParams.data.valor.pesquisa;
 
    // console.log(this.navParams.data.valor.pesquisa);
     
   }
 
   irVerEmpresa(id: number){
     this.navCtrl.push(VerempresaPage, {id});
   }
 
   
   getData(valor){
    
     let url = 'https://app.agreste360graus.com.br/bezerros/index.php?component=json&action=pesquisar&s='+ valor;
     let data: Observable<any> = this.http.get(url);
     data.subscribe(result => {
     this.items = result;  
      
     });
   }
 
 
 
   irHome(){
     this.navCtrl.popToRoot();
   }
 

}
