import { ProductService } from './../services/product.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from '../models/product';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  public productList: Observable<Product[]>;

  constructor(
    private router: Router,
    public productService: ProductService,
  ) {}

  // chamar página do form
    pushPage(){
      this.router.navigate(['/ProductFormComponent']);
    }

    ngOnInit(){
      this.productList = this.productService.getProductList();
    }

  }


