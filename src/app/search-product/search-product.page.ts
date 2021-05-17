import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { first } from 'rxjs/operators';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-search-product',
  templateUrl: './search-product.page.html',
  styleUrls: ['./search-product.page.scss'],
})
export class SearchProductPage implements OnInit {
  public productsBackup: any[];
  public products: any[];

  constructor(
    private productService: ProductService,
    private firestore: AngularFirestore,
  ) { }

  async ngOnInit() {
    this.products = await this.initializeItems();
    this.productsBackup = [...this.products];
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
      this.productsBackup = [...this.products];
    }

    this.products = this.productsBackup.filter(currentProduct => {
      if (currentProduct.nome && searchTerm) {
        return (currentProduct.nome.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
      }
    });
  }

  addToCart(products){
    console.log('adicionado a comanda');
  }

}
