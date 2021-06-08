import { DetailComponent } from './../detail/detail.component';
import { Venda } from './../models/venda';
import { AngularFirestore, CollectionReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
public vendaList: Observable<Venda[]>;
  modalController: ModalController;

  constructor(
    private db: AngularFirestore,
    public productService: ProductService,
    private router: Router,
  private alertController: AlertController

  ) {}



  ngOnInit(){
    this.vendaList = this.productService.getVendasList();
  }

  async onClick(){
    const alert = await this.alertController.create({
      header: `Detalhes da venda`,
      message: `listar produtos, qtd, valor, forma de pagamento, etc`

      }
    );
    return await alert.present();

  }
}
