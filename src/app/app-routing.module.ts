import { UpdateProductComponent } from './update-product/update-product.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
   {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'ProductFormComponent',
    component: ProductFormComponent
  },

  {
    path: 'tab3',
    loadChildren: () => import('./tab3/tab3.module').then(m => m.Tab3PageModule)
  },
  {
    path: 'UpdateProductComponent',
    component: UpdateProductComponent,
  },
  {
    path: 'updat-products',
    loadChildren: () => import('./updat-products/updat-products.module').then( m => m.UpdatProductsPageModule)
  },
   { path: 'updateProducts', loadChildren: () => import('./update-products/update-products/update-products.module').then(m => m.UpdateProductsModule) }


];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
