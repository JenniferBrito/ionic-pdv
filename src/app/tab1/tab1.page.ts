import { AlertController } from '@ionic/angular';
import { ProductService } from './../services/product.service';
import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  public productList: Observable<Product>;
  public products = [];

  constructor(
    private productService: ProductService,
    private alrtCtrl: AlertController,
  ) {}

  ngOnInit(){
    const cartItems = this.productService.cart.value;

    this.productService.getProductList().pipe(take(1)).subscribe(
      allProducts => {
        this.products = allProducts.filter(p =>
          cartItems[p.id]
        ).map(product => {
          return {...product,count: cartItems[product.id]}
        });
      }
    );
  }

  removeFromCart(productId){
   return this.productService.removeFromCart(productId);
  }

}
