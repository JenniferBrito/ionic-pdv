import { Product } from './../models/product';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {


  products: AngularFirestoreCollection<Product>;
  productRef: AngularFireObject<any>;

constructor(
  private db: AngularFirestore,
  private fire: AngularFireDatabase,

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

  getProduct(id: string){
    this.productRef = this.fire.object(`products/${id}`);
    return this.productRef;
  }

  //lista detalhes do produto
  getProductDetail(productId: string): Observable<Product>{
    return this.db.collection('products').doc<Product>(productId).valueChanges();
   }

   //deletar produto
   deleteProduct(productId: string): Promise<void>{
     return this.db.doc(`products/${productId}`).delete();
   }

  updateProduct(id, product: Product){
     return this.productRef.update({
       nome: product.nome,
       qtd: product.qtd,
       precoCusto: product.precoCusto,
       precoVenda: product.precoVenda
     });
   }
}
