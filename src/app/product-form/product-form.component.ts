import { AngularFirestore } from '@angular/fire/firestore';
import { PriceValidator } from './../../validators/price';
import { ProductService } from './../services/product.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';


@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  public addProductForm: FormGroup;

  constructor(
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public formBuilder: FormBuilder,
    public firebaseData: ProductService, // FirestoreService p/ produto
    public db: AngularFirestore,
    private router: Router,
    ) { }

  ngOnInit() {
    this.addProductForm = this.formBuilder.group({
      nome: [
        '',
        Validators.compose([Validators.required, Validators.maxLength(45)]),
      ],
      qtd: [
        '',
        Validators.compose([Validators.required, PriceValidator.isValid]),
      ],
      precoCusto: [
        '',
        Validators.compose([Validators.required, PriceValidator.isValid]),
      ],
      precoVenda: ['', Validators.compose([Validators.required, PriceValidator.isValid])],
    });
  }

    async addProduct(){
      const loading = await this.loadingCtrl.create();

      const nome = this.addProductForm.value.nome;
      const qtd = this.addProductForm.value.qtd;
      const precoCusto = this.addProductForm.value.precoCusto;
      const precoVenda = this.addProductForm.value.precoVenda;

      this.firebaseData.createProduct(nome,qtd, precoCusto, precoVenda).then(
        () => {
          loading.dismiss().then(() => {
            this.router.navigateByUrl('');
          });
        },
        error => {
          loading.dismiss().then(() => {
            console.error(error);
          });
        }
      );

      return await loading.present();
    }


}
