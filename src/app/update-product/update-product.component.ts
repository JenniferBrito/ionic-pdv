import { ModalController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.scss'],
})
export class UpdateProductComponent implements OnInit {

  @Input() id: string;
  @Input() nome: string;
  @Input() qtd: number;
  @Input() precoCusto: number;
  @Input() precoVenda: number;
  constructor(
    private firestore: AngularFirestore,
    private modalController: ModalController,
  ) { }

  ngOnInit() {}

  updateProduct(nome, quantidade, precoCusto, precoVenda){
    let updateProduct = {}
    updateProduct['nome'] = nome,
    updateProduct['quantidade'] = quantidade,
    updateProduct['precoCusto,'] = precoCusto,
    updateProduct['precoVenda,'] = precoVenda,
    this.firestore.doc('/products/'+this.id).update(updateProduct).then(()=>{
      this.modalController.dismiss()
    })
  }
}
