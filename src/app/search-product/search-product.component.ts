import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase/app';
import { first } from 'rxjs/operators';
import { ProductService } from '../services/product.service';

const increment = firebase.firestore.FieldValue.increment(1);
const decrement = firebase.firestore.FieldValue.increment(-1);

@Component({
  selector: 'app-search-product',
  templateUrl: './search-product.component.html',
  styleUrls: ['./search-product.component.scss'],
})

export class SearchProductComponent implements OnInit {
  public productsBackup: any[];
  public products: any[];
  public comanda: any[];

  constructor(
    private productService: ProductService,
    private firestore: AngularFirestore,
  ) { }

  async ngOnInit() {
    this.products = await this.initializeItems();

  }


  async initializeItems():Promise<any> {
    const products = await this.firestore.collection('products')
    .valueChanges().pipe(first()).toPromise();

    this.productsBackup = products;
    return products;
  }

  async filterList(evt) {
    this.products = this.productsBackup;
    const searchTerm = evt.srcElement.value;

    if (!searchTerm) {
      return;
    }

    this.products = this.products.filter(currentProduct => {
      if (currentProduct.nome && searchTerm) {
        return (currentProduct.nome.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
      }
    });
  }

  addToCart(products){
    

    console.log();
  }

}

