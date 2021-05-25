import { Product } from './../models/product';
import { ComandaService } from './../services/comanda.service';
import { LoadingController } from '@ionic/angular';
import { ProductService } from './../services/product.service';
import { Component, Injectable, OnInit } from '@angular/core';

import { Router } from '@angular/router';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],

})

@Injectable({
  providedIn: 'root'
})
export class Tab1Page implements OnInit{
  comanda: Product[] = [];
  valorDesconto: number = 0;
  constructor(
    private loadingCtrl: LoadingController,
    private comandaService: ComandaService,
    private productService: ProductService,
    private router: Router,
  ) {}


  ngOnInit(){
    this.comanda = this.comandaService.getComanda();
  }


  pushPage(){
    this.router.navigate(['/SearchProductComponent']);
    console.log('amiga foi')
  }


    decreaseComandaItem(product){
      this.comandaService.decreaseProduct(product);
    }

    increaseComandaItem(product){
      this.comandaService.addComanda(product);
    }

    removeComandaItem(product){
      this.comandaService.removeProduct(product);
    }

    getTotal(){
      return this.comandaService.getTotal(this.valorDesconto);
    }

  async checkout(){
   this.comandaService.checkout(this.comanda);
  }
}

