import { UpdateProductComponent } from './../update-product/update-product.component';
import { Product } from './../models/product';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ModalController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ProductService {


  products: AngularFirestoreCollection<Product>;
constructor(
  private db: AngularFirestore,
  private modalController: ModalController,

  ) {}

  createProduct(nome: string, qtd: number, precoCusto: number, precoVenda: number): Promise<void>{
    const id = this.db.createId();

    return this.db.doc(`products/${id}`).set({
      id,
      nome,
      qtd,
      precoCusto,
      precoVenda,
    });

  }

  //lista de produtos
  getProductList(): Observable<Product[]>{
    return this.db.collection<Product>(`products`).valueChanges();
  }

  //lista detalhes do produto
  getProductDetail(productId: string): Observable<Product>{
    return this.db.collection('products').doc<Product>(productId).valueChanges();
   }

   //deletar produto
   deleteProduct(productId: string): Promise<void>{
     return this.db.doc(`products/${productId}`).delete();
   }

  async editProduct(nome: string, qtd: number, precoCusto: number, precoVenda: number){
     const modal =  this.modalController.create({
       component: UpdateProductComponent,
       componentProps: {
         'nome' : nome,
         'qtd' : qtd,
         'precoCusto' : precoCusto,
         'precoVenda': precoVenda
       }
     });
     return (await modal).present();
   }
}
