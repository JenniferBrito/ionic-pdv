import { Product } from './../models/product';
import { AngularFirestore, AngularFirestoreCollection, CollectionReference } from '@angular/fire/firestore';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AlertController } from '@ionic/angular';
import firebase from 'firebase/app';
import { Plugins } from '@capacitor/core';

const { Storage } = Plugins;
const cartStorageKey = 'my_cart';
const increment = firebase.firestore.FieldValue.increment(1);
const decrement = firebase.firestore.FieldValue.increment(-1);

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  cart = new BehaviorSubject({});
  cartKey = null;
  firestoreList: any;
  products: AngularFirestoreCollection<Product>;
  productRef: AngularFireObject<any>;



constructor(
  private db: AngularFirestore,
  private fire: AngularFireDatabase, // pega o objeto inteiro
  private alertController: AlertController,



  ) {
    this.loadCart();
  }


// cria produto
  createProduct(nome: string, qtd: any, precoCusto: number, precoVenda: number): Promise<void>{
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

    return this.db.collection<Product>(`products`,  (ref: CollectionReference) =>
    ref.orderBy('nome', 'asc')).valueChanges();
  }

// pega produto individual
  getProduct(id: string){
    this.productRef = this.fire.object(`/products/${id}`);
    return this.productRef;

  }

  //lista detalhes do produto
  getProductDetail(productId: string){

    return this.db.collection('products').doc<Product>(productId).valueChanges();
   }

   //deletar produto
   deleteProduct(productId: string): Promise<void>{

     return this.db.doc(`products/${productId}`).delete();
   }


// edita produto
  async updateProduct(product: Product): Promise<void>{
    const alert = this.alertController.create({
      message: `Editar Produto`,
      inputs: [
        {name: 'nome', placeholder: 'Nome', value: product.nome },
        {name: 'qtd', placeholder: 'Quantidade', value: product.qtd},
        {name: 'precoCusto', placeholder: 'Preço de Custo', value: product.precoCusto},
        {name: 'precoVenda', placeholder: 'Preço de Venda', value: product.precoVenda},
      ],
      buttons: [
      {
        text: 'Cancelar',
        role: 'cancel'
      },
      {
        text: 'Atualizar',
        handler: data => {this.db.doc(`/products/${product.id}`).update(
          {
            nome: data.nome,
            qtd: data.qtd,
            precoCusto: data.precoCusto,
            precoVenda: data.precoVenda
          });
        }
      }
     ],
    });

    (await alert).present();
  }



  async loadCart(){
    const result = await Storage.get({key: cartStorageKey});

    // verifica se há itens no carrinho
    if (result.value){
      this.cartKey = result.value;
      this.db.collection('cart').doc(this.cartKey).valueChanges().subscribe(
        (result: any) =>  {delete result['lastUpdate'];
        this.cart.next(result || {});
        }
      );
    }else {
      // cria um novo carrinho
      const fbDoc = await this.db.collection('cart').add({
        lastUpdate: firebase.firestore.FieldValue.serverTimestamp(),
      });
      this.cartKey = fbDoc.id;
      await Storage.set({key: cartStorageKey, value: this.cartKey});

      this.db.collection('cart').doc(this.cartKey).valueChanges().subscribe((result: any) => {
        delete result['lastUpdate'];
        console.log('carrinho modificado');
        this.cart.next(result || {});
      });
    }
  }


   addToCart(productId){
    // atualiza o carrinho
   this.db.collection('cart').doc(this.cartKey).update({
     [productId]: increment,
     lastUpdate: firebase.firestore.FieldValue.serverTimestamp(),
   });

   // atualiza estoque do produto
   this.products.doc(productId).update({
     qtd: decrement,
   });
   console.log('adicionado ao firebase');
}

  removeFromCart(productId){
    // remove produto do carrinho
    this.db.collection('cart').doc(this.cartKey).update({
      [productId]: decrement,
      lastUpdate: firebase.firestore.FieldValue.serverTimestamp(),
    });

    // atualiza estoque do produto
    this.products.doc(productId).update({
      qtd: increment,
    });
  }



}
