import { AlertController } from '@ionic/angular';
import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

  public product: Product;

  constructor(
    private   alertController: AlertController,
    private router: Router,
    private firestoreService: ProductService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    const productId: string = this.route.snapshot.paramMap.get('id');

    this.firestoreService.getProductDetail(productId).subscribe(product => {
      this.product = product;
    });
  }

  async deleteProduct(productId: string,): Promise<void>{
    const alert = await this.alertController.create({
      message: `Deletar Produto?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: b => {
            console.log('confirmar cancelamento: b')
          }
        },
        {
          text: 'Confirmar',
          handler: () => {
            this.firestoreService.deleteProduct(productId).then(() => {
              this.router.navigateByUrl('');
            });
          },
        },
      ]
    });

    await alert.present();
   }

}
