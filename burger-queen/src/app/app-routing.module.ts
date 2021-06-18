import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Importar componentes
import { LoginComponent } from './login/login.component';
// import { BarSideComponent } from './bar-side/bar-side.component';
import { UserComponent } from './user/user.component';
// import { ProductsComponent } from './products/products.component';
// import { WaiterTablesComponent } from './waiter-tables/waiter-tables.component';
// import { OrdersComponent } from './orders/orders.component';
// import { OrdersKitchenComponent } from './orders-kitchen/orders-kitchen.component';
// Array de rutas
const routes: Routes = [
  {path: '', component: LoginComponent}, //por default
  {path: 'user', component: UserComponent},
  // {path: 'products', component: ProductsComponent},
  // {path: 'waitertables', component: WaiterTablesComponent},
  // {path: 'orders', component: OrdersComponent},
  // {path: 'orderskitchen', component: OrdersComponent},
  {path: '**', component: LoginComponent} //mientras login hasta tener un componente de error
];

@NgModule({
  // cargamos todas las configuraciones de la ruta
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
