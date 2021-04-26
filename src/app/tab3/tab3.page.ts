import { Product } from './../models/product';
import { ProductService } from './../services/product.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(
    public productService: ProductService,
  ) {}

  addProduct(){
   // this.productService.add(); // criar um form p/ product
  }

}
