import { Routes } from '@angular/router';
import { ProductFormComponent } from '../components/product-form/product-form.component';
import { ProductListComponent } from '../components/product-list/product-list.component';
import { ProductDetailComponent } from '../components/product-detail/product-detail.component';

export const routes: Routes = [
  { path: 'edit-product/:id', component: ProductFormComponent },
  { path: '', component: ProductListComponent },
  { path: 'add-product', component: ProductFormComponent },
  { path: 'product-detail/:id', component: ProductDetailComponent }

];
