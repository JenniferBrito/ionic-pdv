
import { Injectable } from '@angular/core';
import { CollectionReference, AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../models/product';



@Injectable({
  providedIn: 'root'
})
export class ComandaService {

  private comanda = [];
  private comandaItemCount = new BehaviorSubject(0);

  constructor(
    private db: AngularFirestore
  ){}

  getProductList(): Observable<Product[]>{

    return this.db.collection<Product>(`products`,  (ref: CollectionReference) =>
    ref.orderBy('nome', 'asc')).valueChanges();
  }

  getComanda(){
    return this.comanda;
  }

  getComandaItemCount(){
    return this.comandaItemCount;
  }

  addComanda(product){
    let added = false;

    for (let p of this.comanda){
      if(p.id === product.id){
        p.amount += 1;
        added = true;
        console.log(p);
        break;

      }
    }
    if(!added){
      product.amount = 1;
      this.comanda.push(product);
      console.log(product);

    }
  }

  decreaseProduct(product){
    for(let [index, p] of this.comanda.entries()){
      if (p.id === product.id){
        p.amount -= 1;
        if(p.amount == 0){
          this.comanda.splice(index, 1)
        }
      }
    }
    this.comandaItemCount.next(this.comandaItemCount.value - 1);
  }

  removeProduct(product){
    for (let [index, p] of this.comanda.entries()){
      if (p.id === product.id){
        this.comandaItemCount.next(this.comandaItemCount.value  - p.amount);
        this.comanda.splice(index, 1);
      }
    }
  }
}
