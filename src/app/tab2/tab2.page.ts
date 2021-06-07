import { Venda } from './../models/venda';
import { AngularFirestore, CollectionReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
public vendaList: Observable<Venda[]>;

  constructor(
    private db: AngularFirestore,
    public productService: ProductService,
    private router: Router,
  ) {}



  ngOnInit(){
    this.vendaList = this.productService.getVendas();
  }

  onClick(){
    console.log('pagina de detalhe')
    this.router.navigate(['/DetailComponent']);
  }
}
