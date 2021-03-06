import { Venda } from './../models/venda';
import { Product } from './../models/product';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, CollectionReference } from '@angular/fire/firestore';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AlertController } from '@ionic/angular';





@Injectable({
  providedIn: 'root'
})
export class ProductService {

  firestoreList: any;
  products: AngularFirestoreCollection<Product>;
  productRef: AngularFireObject<any>;
  vendaRef: AngularFirestoreDocument<any>;
  addProduct = [];




constructor(
  private db: AngularFirestore,
  private fire: AngularFireDatabase, // pega o objeto inteiro
  private alertController: AlertController,
  ) {}


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
        {name: 'precoCusto', placeholder: 'Pre??o de Custo', value: product.precoCusto},
        {name: 'precoVenda', placeholder: 'Pre??o de Venda', value: product.precoVenda},
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

  // lista de vendas
  getVendasList(): Observable<Venda[]>{
    return this.db.collection<Venda>(`vendas`,  (ref: CollectionReference) =>
    ref.orderBy('data', 'asc')).valueChanges();

  }

  // pega venda individual
  getVenda(id: string){
    this.vendaRef = this.db.collection('vendas').doc(id);
    console.log(this.vendaRef.valueChanges())
    return this.vendaRef;

  }

   //deletar venda
   deleteVenda(vendaId: string): Promise<void>{

    return this.db.doc(`vendas/${vendaId}`).delete();
  }

  }




