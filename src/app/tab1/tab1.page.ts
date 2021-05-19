import { AngularFirestore } from '@angular/fire/firestore';
import { ProductService } from './../services/product.service';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page  {


  public products: Observable<Product[]>;
  public prod: Observable<Product>;
  public comanda: any;

  constructor(
    private productService: ProductService,
    private firestore: AngularFirestore,
    private router: Router,
  ) {}

  pushPage(){
    this.router.navigate(['/SearchProductComponent']);
  }





  async checkout(){
   this.productService.checkout();
  }

  /* removeFromCart(productId){
   return this.productService.removeFromCart(productId);
  }
 */
}

