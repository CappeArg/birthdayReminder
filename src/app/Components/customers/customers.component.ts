import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/Interfaces/customers';
import { CustomersServiceService } from '../../Services/customers-service.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  customers: Customer[]

  constructor(public customerService : CustomersServiceService) { }

  ngOnInit() {
    this.customerService.getCustomers().subscribe(customers=>{
      this.customers = customers.items
    });

    // (
    // this.customerService.createCustomers({
    //   name:"TestRealTime",
    //   lastName: "RTLN",
    //   email:    "probate@testing.com",
    //   birthday:    "2000-01-01 10:00:00.123Z"
    // }).subscribe(data => {
    //   console.log(data)
    // })

    // this.customerService.editCustomers(
    //   {
    //        id: "925ck2logmyaea3",
    //        name:"NuevaPrueba",
    //        lastName: "PruebaLN",
    //        email:    "probando@testing.com",
    //        birthday:  "01/02/01"
    //   }
    // ).subscribe(data=>{
    //   console.log(data)
    // }))
  }
    
  }