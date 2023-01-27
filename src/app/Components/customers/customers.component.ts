import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Customer } from 'src/app/Interfaces/customers';

import { CustomersServiceService } from '../../Services/customers-service.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  form={
    name: 'Pablo',
    lastname:'Cappellacci',
    email:'pablocappe@gmail.com',
    birthday:'06/07/1989'};

  customer: Customer;
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
    

    // this.customerService.deleteCustomers(
    // {
    //        id: "wm4fm3oy5y1lnei",
    //        name:"NuevaPrueba",
    //        lastName: "PruebaLN",
    //        email:    "probando@testing.com",
    //        birthday:  "01/02/01"
    // }
    // ).subscribe(data=>{
    //   if(data=""){
    //     console.log("Se borro perfecto")
    //   }
    //   else{
    //     console.log(data)
    //   }
    // })
    
  }



  addCustomerForm(formAdd:NgForm){

    this.customer = formAdd.form.value;
    this.customer.birthday = new Date(formAdd.form.value.birthday).toISOString();
    let {name, lastName, email, birthday} = this.customer

    this.customerService.createCustomers({
      name: name,
      lastName: lastName,
      email:    email,
      birthday:   birthday
    }).subscribe(data => {
      console.log(data)
    })

   return console.log(this.customer)
  }

  deleteCustomer(customer){
    console.log("el customer es:" + customer.lastName)
    
    this.customerService.deleteCustomers( customer.id
    ).subscribe(data=>{
      if(data == null){
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