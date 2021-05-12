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
export class Tab1Page  {

  public productList: Observable<Product>;
  public products = [];
  public prod: Observable<Product>;

  constructor(
    private productService: ProductService,
    private alertCtrl: AlertController,
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

  async checkout(){
    const alert = await this.alertCtrl.create({
      header: 'Sucesso',
      message: 'Compra realizada com sucesso',
      buttons: ['Continuar comprando']
    });

   await alert.present();
   this.productService.checkout();
  }

  removeFromCart(productId){
   return this.productService.removeFromCart(productId);
  }

}
