import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-update-products',
  templateUrl: './update-products.page.html',
  styleUrls: ['./update-products.page.scss'],
})
export class UpdateProductsPage implements OnInit {

  updateProductForm: FormGroup;
  id: string;
  constructor(
    private productService: ProductService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    public fb: FormBuilder,
  ) {
    this.id = this.activeRoute.snapshot.paramMap.get('id');
    this.productService.getProduct(this.id).valueChanges().subscribe(
      res => {
        this.updateProductForm.setValue(res);
      }
    );
  }

  ngOnInit() {
    this.updateProductForm = this.fb.group({
      nome: [''],
      qtd: [''],
      precoCusto: [''],
      precoVenda: [''],
    });
    console.log(this.updateProductForm.value);
  }

  updateForm(){
    this.productService.updateProduct(this.id, this.updateProductForm.value)
      .then(
        () => {
          this.router.navigate(['/tab3']);
        }
      ).catch(error => console.log(error));
  }

}
