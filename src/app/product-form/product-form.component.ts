import { AngularFirestore } from '@angular/fire/firestore';
import { PriceValidator } from './../../validators/price';
import { ProductService } from './../services/product.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  public addProductForm: FormGroup;
  constructor(public formBuilder: FormBuilder, public firebaseData: ProductService, public db: AngularFirestore) { }

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

    addProduct(){
      if(!this.addProductForm.valid){
        console.log("tente novamente");
      }else{
        this.firebaseData.saveProduct(
          this.addProductForm.value.nome,
          parseFloat(this.addProductForm.value.qtd),
          parseFloat(this.addProductForm.value.precoCusto),
          parseFloat(this.addProductForm.value.precoVenda),
          )
          .then (()=> {
            this.addProductForm.reset();
          });

      }
    }

}
