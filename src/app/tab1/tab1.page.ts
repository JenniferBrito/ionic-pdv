import { ComandaService } from './../services/comanda.service';
import { LoadingController } from '@ionic/angular';
import { ProductService } from './../services/product.service';
import { Component, Injectable } from '@angular/core';

import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],

})

@Injectable({
  providedIn: 'root'
})
export class Tab1Page {


  cItems: any[] = [];
  valorTotal: number = 0;
  isItemLoaded: boolean = false;
  isComandaEmpty: boolean = true;


  constructor(
    private loadingCtrl: LoadingController,
    private comandaService: ComandaService,
    private productService: ProductService,
    private router: Router,
  ) {}

  pushPage(){
    this.router.navigate(['/SearchProductComponent']);
    console.log('amiga foi')
  }

  ionViewDidLoad(){
    this.loadComandaItems();
  }


  async loadComandaItems(){
    let loader = this.loadingCtrl.create({
      message: 'Aguarde...'
    });

    (await loader).present();

    this.comandaService.getItems().then(async val => {
      this.cItems = val;

      if(this.cItems.length > 0){
        this.cItems.forEach((v, indx) => {
          this.valorTotal += parseInt(v.vTotal);
        });
        this.isComandaEmpty = false;
      }

      this.isItemLoaded = true;

      (await loader).dismiss();
    }).catch(err => {});

  }


  async checkout(){
   this.productService.checkout();
  }

  removeItem(item){
    this.comandaService.removeFromComanda(item).then(()=>{
      this.loadComandaItems();
    });
  }

}

