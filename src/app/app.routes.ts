import { Routes } from '@angular/router';
import { About } from './about/about';
import { Product } from './product/product';
import { Dashboard } from './dashboard/dashboard';

export const routes: Routes = [
  { path: '', component: Dashboard },
  { path: 'about', component: About },
  { path: 'product', component: Product },
];
