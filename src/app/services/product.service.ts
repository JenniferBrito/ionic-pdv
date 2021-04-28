import { Product } from './../models/product';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  products: AngularFirestoreCollection<Product>;
constructor(
  private db: AngularFirestore,
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
}
