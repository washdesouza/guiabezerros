import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Validators, FormBuilder} from '@angular/forms';
import { Storage } from '@ionic/storage';
import { CategoriasPage } from '../categorias/categorias';
import { PesquisarPage } from '../pesquisar/pesquisar';
import { CupomPage } from '../cupom/cupom';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public items:any;
  public pesquisa : any;
  key:string = 'items';
  constructor(public navCtrl: NavController,  public http: HttpClient, public formBuilder : FormBuilder, private modal: ModalController, private storage: Storage) {
    
    this.getData();
    this.loadData();
    
    this.pesquisa = this.formBuilder.group({
      pesquisa:['',Validators.required]
    });
  }
  getData(){
    let url = 'https://app.agreste360graus.com.br/bezerros/index.php?component=json&action=principaiscategorias';
    let data: Observable<any> = this.http.get(url);
    data.subscribe(result => {
    this.items = result; 
    this.storage.set(this.key, JSON.stringify(this.items)); 
    //console.log(this.items);
    });
 }

 safeData(){
  this.storage.set(this.key, JSON.stringify(this.items));
}

loadData(){
  this.storage.get(this.key).then((val) => {
    if(val !=null && val != undefined){
      this.items = JSON.parse(val);
    }
  });
}

  irCupom(){
    this.navCtrl.push(CupomPage)
  }
  
  irCategoria(id: number){
   // this.navCtrl.push('cate', {id});
   this.navCtrl.push(CategoriasPage,{id})
  }

  irPesquisa(pesquisar){
  var pesquisar = this.pesquisa.value
  
   this.navCtrl.push(PesquisarPage,{
     valor: pesquisar
   });
   //console.log(pesquisar);
  }
  

}
