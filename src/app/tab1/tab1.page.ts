import { Product } from './../models/product';
import { ComandaService } from './../services/comanda.service';
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
  pg: String;
  constructor(
    private comandaService: ComandaService,
    private router: Router,
  ) {}


  ngOnInit(){
    this.comanda = this.comandaService.getComanda();
  }


  pushPage(){
    this.router.navigate(['/SearchProductComponent']);
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


  getPagamento(){
   return this.comandaService.getFormaPagamento(this.pg);
  }
}
