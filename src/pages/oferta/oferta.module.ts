import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OfertaPage } from './oferta';

@NgModule({
  declarations: [
    OfertaPage,
  ],
  imports: [
    IonicPageModule.forChild(OfertaPage),
  ],
})
export class OfertaPageModule {}
