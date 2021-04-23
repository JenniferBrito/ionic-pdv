import { Product } from './../models/product';
import { AngularFirestore, AngularFirestoreCollection, CollectionReference } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  products: AngularFirestoreCollection<Product>;
constructor(
  private db: AngularFirestore,
  ) {this.setProducts; }

  private setProducts(): void{
    this.products = this.db.collection<Product>('/products',
    (ref: CollectionReference) =>
    ref.orderBy('done', 'asc')
        .orderBy('title', 'asc') );
  }

  create(product: Product): Promise<void>{
    const uid = this.db.createId();
    return this.products.doc<Product>(uid).set({
      uid,
      title: product.title,
      description: product.description,
      price: product.price,

    });
  }

  update(product: Product): Promise<void>{
    return this.products.doc<Product>(product.uid)
          .update(product);
  }

  delete(product: Product): Promise<void>{
    return this.products.doc<Product>(product.uid)
          .delete();
  }

}
