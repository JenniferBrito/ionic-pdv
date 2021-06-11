import { Product } from './../models/product';
import { Venda } from './../models/venda';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
public vendaList: Observable<Venda[]>;
public produtos: Observable<Product[]>;
public item:  Product[];


  constructor(
    private db: AngularFirestore,
    public productService: ProductService,
  ) {
    const prod = this.db.collection("vendas");
   // this.produtos = prod.valueChanges();
  }



  ngOnInit(){
    this.vendaList = this.productService.getVendasList();
  }


}
