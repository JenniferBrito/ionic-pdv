import { TabsPage } from './tabs/tabs.page';
import { Tab3PageModule } from './tab3/tab3.module';
import { ProductFormComponent } from './product-form/product-form.component';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { Tab3Page } from './tab3/tab3.page';

const routes: Routes = [
   {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'ProductFormComponent',
    component: ProductFormComponent
  }, {
    path: 'detail',
    loadChildren: () => import('./pages/detail/detail.module').then( m => m.DetailPageModule)
  },

  {
    path: 'tab3',
    component: Tab3Page
  }


];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
