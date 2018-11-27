import { MapaPage } from './../mapa/mapa';
import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import { ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HomePage } from '../home/home';
import { ActionSheetController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { OfertaPage } from '../oferta/oferta';

/**
 * Generated class for the VerempresaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-verempresa',
  templateUrl: 'verempresa.html',
})
export class VerempresaPage {

  public id : number;
  public comentarios:any
  public oferta : any;
  public hits: number;
  public gethit: any;
  public verempresas:any;
  key:string = 'verempresa';


  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage, public http: HttpClient, public toastCtrl: ToastController, public actionSheetCtrl: ActionSheetController, public alertCtrl: AlertController) {
    this.getData(this.navParams.get('id'));
    this.loadData(this.navParams.get('id'));
  //  this.getComentario(this.navParams.get('id'));
    this.getHit(this.navParams.get('id'));

  }


  getData(id){
    if(id == undefined){
      this.navCtrl.setRoot(HomePage);
    }else{
    let url = 'https://app.agreste360graus.com.br/bezerros/index.php?component=json&action=empresaitem&id='+ id;
    let data: Observable<any> = this.http.get(url);
    data.subscribe(result => {
    this.verempresas = result;  
    this.storage.set(this.key + id, JSON.stringify(this.verempresas)); 
  // console.log(this.empresas);
    
    });
  }
  }
    getHit(id){
      if(id == undefined){
        this.navCtrl.setRoot(HomePage);
      }else{
      let url = 'https://app.agreste360graus.com.br/bezerros/index.php?component=json&action=hits&id='+ id;
      let data: Observable<any> = this.http.put(url,null);
      
     data.subscribe(result => {
      this.gethit = result;  
     // this.storage.set(this.key + id, JSON.stringify(this.verempresas)); 
     // console.log(this.http.get(url));
       
     });
    }
  }

  loadData(id){
    this.storage.get(this.key + id).then((val) => {
      if(val !=null && val != undefined){
        this.verempresas = JSON.parse(val);
      }
    });
  }

  getComentario(id){
    let url = 'https://app.agreste360graus.com.br/bezerros/index.php?component=json&action=comentarios&id='+ id;
    let data: Observable<any> = this.http.get(url);
    data.subscribe(result => {
    this.comentarios = result;  
     
    });
  }

  map(log, lati){
    console.log('Longitude='+log + ' Latitude= '+ lati);
    localStorage.setItem('log',log ); 
    localStorage.setItem('lat',lati ); 
    this.navCtrl.push(MapaPage); 
  }

solicitarempresa(numero, id){

  const actionSheet = this.actionSheetCtrl.create({
    title: 'Solicite o Código:',
    buttons: [
      {
        text: 'Por SMS para 81 ' + numero,
        //role: 'destructive',
        handler: () => {

          let url = 'https://agreste360graus.com.br/totalvoice/send.php?SMS=true&numero=81'+ numero + '&id='+ id;
          let data: Observable<any> = this.http.put(url,null);
          
         data.subscribe(result => {
          this.gethit = result;  
         // this.storage.set(this.key + id, JSON.stringify(this.verempresas)); 
         // console.log(this.http.get(url));
           
         });
          const alert = this.alertCtrl.create({
            title: 'Envio por SMS',
            subTitle: 'O código para verificação foi enviado para este número 81 '+ numero + ' Ao receber esse código informe ele.',
            buttons: ['OK']
          });

          alert.present();

          
          console.log('Codigo enviado por SMS');
        }
      },{
        text: 'Ligar para 81 ' + numero,
        handler: () => {

      let url = 'https://agreste360graus.com.br/totalvoice/send.php?TTS=true&numero=81'+ numero + '&id=' + id;
      let data: Observable<any> = this.http.put(url,null);
      
     data.subscribe(result => {
      this.gethit = result;  
     // this.storage.set(this.key + id, JSON.stringify(this.verempresas)); 
     // console.log(this.http.get(url));
       
     });

          const alert = this.alertCtrl.create({
            title: 'Ligação',
            subTitle: 'você Receberar o código para verificação em uma ligação para o número 81 '+ numero + ' Ao receber esse código informe ele.',
            buttons: ['OK']
          });
          alert.present();
          console.log('Ligação Efetuada');
        }
      },
      {
        text: 'Informar Codigo',
        handler: () => {
          const prompt = this.alertCtrl.create({
            title: 'Informe o Código',
            message: "Insira o Código que você Recebeu.",
            inputs: [
              {
                name: 'cod',
                placeholder: 'cod'
              },
            ],
            buttons: [
              {
                text: 'Cancelar',
                handler: data => {
                  console.log('Cancelar');
                }
              },
              {
                text: 'Enviar',
                handler: data2 => {

                  console.log(data2.cod);
                  let url = 'https://app.agreste360graus.com.br/bezerros/index.php?component=json&action=confirmacod&id='+ id +'&code='+ data2.cod +'&iduser='+ localStorage.getItem('id');
                  let data: Observable<any> = this.http.put(url,null);
                  
                 data.subscribe(result => {
                  this.gethit = result;  
                 // this.storage.set(this.key + id, JSON.stringify(this.verempresas)); 
                 // console.log(this.http.get(url));
                   
                 });

                }
              }
            ]
          });
          prompt.present();
          console.log('Informar o Codigo');
        }
      },
      {
        text: 'Cancelar',
        role: 'cancel',
        handler: () => {
          console.log('Cancelar');
        }
      }
    ]
  });
  actionSheet.present();

}

  semOfertaToast() {
    let toast = this.toastCtrl.create({
      message: 'Sem Ofertas no Momento!',
      duration: 3000
    });
    toast.present();
  }

  ionViewDidLoad() {
    this.id = this.navParams.get('id');
   // console.log(this.id);
  }
  abrirOferta(id : number){
    this.navCtrl.push(OfertaPage, {id});
  }

  irHome(){
       this.navCtrl.popToRoot();
  }
}
