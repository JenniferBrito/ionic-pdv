import { Product } from './../models/product';
import { Injectable } from '@angular/core';
import { CollectionReference, AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { AlertController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class ComandaService {

  data: Date = new Date();
  valorSubTotal: number;
  valorTotal: number;
  fPagamento: String;
  items: ComandaService;
  private comanda = [];
  private comandaItemCount = new BehaviorSubject(0);
  public qtdProd;


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
      if(p.id === product.id){
        p.amount += 1;
        this.qtdProd = product.qtd -1;
        added = true;
        console.log(p);

        break;

      }
    }
    if(!added){
      product.amount = 1,
      this.qtdProd = product.qtd -1,

      this.comanda.push(product);
      console.log(this.comanda);
      console.log(product.qtd);


    }
  }

  decreaseProduct(product: Product){
    for(let [index, p] of this.comanda.entries()){
      if (p.id === product.id){
        p.amount -= 1;

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
    this.valorSubTotal =  this.comanda.reduce((i, j) => i + j.precoVenda * j.amount, 0);
    this.valorTotal = this.valorSubTotal - valorDesconto;
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


updateQtdProd(qtd){
  var pd: Product;
 const id = pd.id;
  return this.db.doc(`products/${id}`).update({qtd: qtd});


}
  checkout(venda){
    var success: boolean;
    if(this.comanda.length != 0 ){
      const key = this.db.createId();
      this.db.collection('vendas').doc(key).set({
        key,
        data: this.data,
        produtos: venda,
        valorSubTotal: this.valorSubTotal,
        valorTotal: this.valorTotal,
        fPagamento: this.fPagamento,
      });
      success = true;
      console.log(this.qtdProd)
      console.log(venda);
    }else{
      this.presentAlert();
    }

    venda.forEach(()=> this.updateQtdProd(this.qtdProd));
 /*    if(success === true){
      this.updateQtdProd(this.qtdProd);
    } */
  }


}

