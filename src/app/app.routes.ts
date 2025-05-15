import { Routes } from '@angular/router';
import {OrdersComponent} from './pages/orders/orders.component';
import {ItemsComponent} from './pages/items/items.component';
import {HamburgersComponent} from './pages/hamburgers/hamburgers.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'pedidos',
    pathMatch: 'full'
  },
  {
    path: 'pedidos',
    component: OrdersComponent
  },
  {
    path: 'itens',
    component: ItemsComponent
  },
  {
    path: 'hamburguers',
    component: HamburgersComponent
  }
];
