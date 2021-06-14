import { Product } from './../models/product';
import { Injectable } from '@angular/core';
import { CollectionReference, AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { AlertController } from '@ionic/angular';
import  firebase from 'firebase';

const INCREMENT = firebase.firestore.FieldValue.increment(1);
const DECREMENT = firebase.firestore.FieldValue.increment(-1);

@Injectable({
  providedIn: 'root'
})
export class ComandaService {

  data: Date =  new Date();
  dataVenda: String;
  valorSubTotal: number;
  valorTotal: number;
  desconto: number;
  fPagamento: String;
  items: ComandaService;
  private comanda = [];
  private comandaItemCount = new BehaviorSubject(0);



  constructor(
    private db: AngularFirestore,
    public alertController: AlertController
  ){
  }

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

  addComanda(product: Product){
    let added = false;

    for (let p of this.comanda){
      if(p.id === product.id && product.qtd > 0){

        p.amount += 1;
        this.db.doc(`products/${product.id}`).update({
          qtd: DECREMENT,
        });
        added = true;
        console.log(p);

        break;

      }this.alertProduto();
    }
    if(!added && product.qtd > 0){
      product.amount = 1,
      this.db.doc(`products/${product.id}`).update({
        qtd: DECREMENT,
      });

      this.comanda.push(product);
      console.log(this.comanda);
      console.log(product.qtd);


    }else{
      this.alertProduto();
    }
  }

  decreaseProduct(product: Product){
    for(let [index, p] of this.comanda.entries()){
      if (p.id === product.id){
        p.amount -= 1;
        this.db.doc(`products/${product.id}`).update({
          qtd: INCREMENT,
        });
        console.log(product.qtd);
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

  getTotal(valorDesconto){
    this.desconto = valorDesconto;
    this.valorSubTotal =  this.comanda.reduce((i, j) => i + j.precoVenda * j.amount, 0);
    this.valorTotal = this.valorSubTotal - this.desconto;
     return this.valorTotal;
  }

  getFormaPagamento(pagamento){
    return this.fPagamento = pagamento;
  }

  async presentAlert(){
    const alert = await this.alertController.create({
      header: 'AVISO!',
      message: 'Comanda vazia, adicione itens',
      buttons: ['Ok']
    });
    await alert.present();
  }
  async alertProduto(){
    const alert = await this.alertController.create({
      header: 'AVISO!',
      message: 'Produto fora de estoque',
      buttons: ['Ok']
    });
    await alert.present();
  }






  checkout(venda){

    if(this.comanda.length != 0 ){
      const key = this.db.createId();

      this.db.collection('vendas').doc(key).set({
        key,
        data: this.data.toDateString(),
        produtos: venda,
        valorSubTotal: this.valorSubTotal,
        valorTotal: this.valorTotal,
        fPagamento: this.fPagamento,
      });
      while(this.comanda.length > 0 ){
        this.comanda.pop();
      }
      if(this.comanda.length === 0){
        this.valorSubTotal = 0;
        this.desconto = 0;
        this.fPagamento = '';
        this.valorSubTotal = 0;
      }
      console.log();
      console.log(this.comanda);
    }else{
      this.presentAlert();
    }



  }


}

