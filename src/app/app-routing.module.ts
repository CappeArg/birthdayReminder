import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CustomersComponent } from './Components/customers/customers.component';
import { HomeComponent } from './Components/home/home.component';
import { TodaysCardComponent } from './Components/todays-card/todays-card.component';


const routes: Routes = [
  {path: 'home', component:HomeComponent},
  {path: 'customers', component: CustomersComponent},
  {path: 'tcards', component: TodaysCardComponent},
  {path: '**', pathMatch:'full', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
