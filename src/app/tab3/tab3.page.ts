import { ProductService } from './../services/product.service';
import { Component } from '@angular/core';
import { title } from 'node:process';

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
    this.productService.create({uid, title, price, description}); // criar um form p/ product
  }

}
