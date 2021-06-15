import { Product } from './../models/product';
import { Venda } from './../models/venda';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { AlertController } from '@ionic/angular';


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
    private alertController: AlertController,
  ) {
  
  }



  ngOnInit(){
    this.vendaList = this.productService.getVendasList();
  }

  //deleta produto
  async deleteVenda(vendaId: string,): Promise<void>{
    const alert = await this.alertController.create({
      message: `Deletar Venda?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',

        },
        {
          text: 'Confirmar',
          handler: () => {
            this.productService.deleteVenda(vendaId);
          },
        },
      ]
    });

    await alert.present();
   }
}
