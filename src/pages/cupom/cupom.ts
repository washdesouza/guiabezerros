import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

/**
 * Generated class for the CupomPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cupom',
  templateUrl: 'cupom.html',
})
export class CupomPage {
  public cupom: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,  public http: HttpClient) {
    this.irCupom();
  }

  ionViewDidLoad() {
   // console.log('ionViewDidLoad CupomPage');
  }
  irHome(){
    this.navCtrl.popToRoot();
  }

  irCupom(){
    let url = 'https://app.agreste360graus.com.br/bezerros/index.php?component=json&action=cupom';
    let data: Observable<any> = this.http.get(url);
    data.subscribe(result => {
    this.cupom = result;  
     
    });
  }

}
