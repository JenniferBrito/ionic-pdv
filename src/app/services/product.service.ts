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
  dbURL = 'console.firebase.google.com/project/teste-5b601/firestore';


constructor(
  private db: AngularFirestore,
  private fire: AngularFireDatabase, // pega o objeto inteiro

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

  async updateProduct(id, product: Product): Promise<void>{
    return await this.db.doc(`project/teste-5b601/firestore/products/`+ id).update(product);
   }
}
