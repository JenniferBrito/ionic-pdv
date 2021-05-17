import { Product } from './../models/product';
import { ProductService } from './../services/product.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  public productList: Observable<Product[]>;


  constructor(
    private alertController: AlertController,
    private router: Router,
    public productService: ProductService,
  ) {}

  // chamar página do form
    pushPage(){
      this.router.navigate(['/ProductFormComponent']);
    }


//lista de produtos
    ngOnInit(){
      this.productList = this.productService.getProductList();
    }


//deleta produto
    async deleteProduct(productId: string,): Promise<void>{
      const alert = await this.alertController.create({
        message: `Deletar Produto?`,
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            handler: data => {
              console.log('confirmar cancelamento: b')
            }
          },
          {
            text: 'Confirmar',
            handler: () => {
              this.productService.deleteProduct(productId);
            },
          },
        ]
      });

      await alert.present();
     }



    //edita produto
      updateProduct(product: Product){
        this.productService.updateProduct(product);
     }


  
  }


