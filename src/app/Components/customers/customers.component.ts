import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/Interfaces/customers';
import Swal from 'sweetalert2';
import { CustomersServiceService } from '../../Services/customers-service.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  customers: Customer[];
  customerPerPage: number;
  totalItems:number;
  totalPages:number;
  addCustomerButton:boolean=false;
  editCustomerButton:boolean=false;

  constructor(public customerService : CustomersServiceService) { }

  ngOnInit() {
    this.customerService.getCustomers().subscribe(customers=>{
      this.customers = customers.items
      this.customerPerPage = customers.perPage
      this.totalItems = customers.totalItems
      this.totalPages = customers.totalPages
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
    

    this.customerService.deleteCustomers(
    {
           id: "wm4fm3oy5y1lnei",
           name:"NuevaPrueba",
           lastName: "PruebaLN",
           email:    "probando@testing.com",
           birthday:  "01/02/01"
    }
    ).subscribe(data=>{
      if(data=""){
        console.log("Se borro perfecto")
      }
      else{
        console.log(data)
      }
    })
    
  }

  addCustomerWindow(){
    // console.log("prueba")
    if(this.addCustomerButton){
      this.addCustomerButton = false
    }else{
      this.addCustomerButton = true;
    }
  }

  editCustomerWindow(){
    if(this.editCustomerButton){
      this.editCustomerButton = false
    }else{
      this.editCustomerButton = true;
    }
  }
    
  }