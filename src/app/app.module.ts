import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomersComponent } from './Components/customers/customers.component';
import { BirthdayCardComponent } from './Components/birthday-card/birthday-card.component';
import { HomeComponent } from './Components/home/home.component';
import { TodaysCardComponent } from './Components/todays-card/todays-card.component';
import { HeaderComponent } from './Components/header/header.component';
import { CustomerscrudComponent } from './Components/customerscrud/customerscrud.component';
import { NavbarComponent } from './Components/navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomersComponent,
    BirthdayCardComponent,
    HomeComponent,
    TodaysCardComponent,
    HeaderComponent,
    CustomerscrudComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
