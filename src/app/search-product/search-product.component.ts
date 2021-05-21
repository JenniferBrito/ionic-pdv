import { ComandaService } from './../services/comanda.service';
import { Tab1Page } from './../tab1/tab1.page';
import { first } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase/app';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product';



@Component({
  selector: 'app-search-product',
  templateUrl: './search-product.component.html',
  styleUrls: ['./search-product.component.scss'],
})

export class SearchProductComponent implements OnInit{

  products: any[];
  productsBackup: any[];


  constructor(
    private productService: ProductService,
    private firestore: AngularFirestore,
    private addComanda: ComandaService,
  ) { }

    async ngOnInit(){
      this.products = await this.initializeItems();
    }

  async initializeItems(): Promise<any>{
    const products = await this.firestore.collection('products').valueChanges().pipe(first()).toPromise();
    this.productsBackup = products;
    return products;
  }

  async filterProduct(evt){
    this.products = this.productsBackup;
    const searchTerm = evt.srcElement.value;

    if(!searchTerm){
      return;
    }

    this.products = this.products.filter(currentProduct => {
      if(currentProduct.nome && searchTerm){
        return (currentProduct.nome.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
      }
    });
  }

  addToComanda(product){
   this.addComanda.addComanda(product);
  }
}

