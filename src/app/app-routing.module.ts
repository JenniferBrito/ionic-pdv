
import { ProductFormComponent } from './product-form/product-form.component';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { SearchProductComponent } from './search-product/search-product.component';
import { DetailComponent } from './detail/detail.component';

const routes: Routes = [
   {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'tab1',
    loadChildren: () => import('./tab1/tab1.module').then(m => m.Tab1PageModule)
  },
  {
    path: 'tab2',
    loadChildren: () => import('./tab2/tab2.module').then(m => m.Tab2PageModule)
  },
  {
    path: 'tab3',
    loadChildren: () => import('./tab3/tab3.module').then(m => m.Tab3PageModule)
  },
  {
    path: 'ProductFormComponent',
    component: ProductFormComponent
  },
  {
    path: 'SearchProductComponent',
    component: SearchProductComponent
  },
  {
    path: 'DetailComponent',
    component: DetailComponent
  },



];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
