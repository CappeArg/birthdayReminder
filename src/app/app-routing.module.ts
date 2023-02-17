import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './Components/home/home.component';
import { TodaysCardComponent } from './Components/todays-card/todays-card.component';
import { ModalCustomerComponent } from './Components/modal-customer/modal-customer.component';
import { CustomersComponent } from './Components/customers/customers.component';


const routes: Routes = [
  {path: 'home', component:HomeComponent},
  {path: 'customers', component: CustomersComponent},
  {path: 'customer', component: ModalCustomerComponent},
  {path: 'customer/:id', component: ModalCustomerComponent},
  {path: 'tcards', component: TodaysCardComponent},
  {path: '**', pathMatch:'full', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
