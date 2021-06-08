import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Venda } from '../models/venda';
import { ProductService } from '../services/product.service';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  public vendaList: Observable<Venda[]>;
  uid;

  constructor(
    public productService: ProductService,

  ) { }

  ngOnInit() {
     this.productService.getVenda(this.uid);

  }

}
