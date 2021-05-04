import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateProductsPage } from './update-products.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateProductsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateProductsPageRoutingModule {}
