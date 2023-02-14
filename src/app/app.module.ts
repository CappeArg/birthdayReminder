import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomersComponent } from './Components/customers/customers.component';
import { BirthdayCardComponent } from './Components/birthday-card/birthday-card.component';
import { HomeComponent } from './Components/home/home.component';
import { TodaysCardComponent } from './Components/todays-card/todays-card.component';
import { HeaderComponent } from './Components/header/header.component';
import { NavbarComponent } from './Components/navbar/navbar.component';

import { HttpClientModule } from "@angular/common/http";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CRUDComponent } from './Components/crud/crud.component';
import { ModalCustomerComponent } from './Components/modal-customer/modal-customer.component';



@NgModule({
  declarations: [
    AppComponent,
    CustomersComponent,
    BirthdayCardComponent,
    HomeComponent,
    TodaysCardComponent,
    HeaderComponent,
    NavbarComponent,
    ModalCustomerComponent,
    CRUDComponent,
      ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
