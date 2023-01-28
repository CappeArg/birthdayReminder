import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Customer } from 'src/app/Interfaces/customers';

import { CustomersServiceService } from '../../Services/customers-service.service';
import { BirthdayCardServiceService } from '../../Services/birthday-card-service.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  form:any;

  customer: Customer;
  customers: Customer[];
  customerPerPage: number;
  totalItems:number;
  totalPages:number;
  addCustomerButton:boolean=false;
  editCustomerButton:boolean=false;

  constructor(private customerService : CustomersServiceService) { }

  ngOnInit() {


    this.customerService.getCustomers().subscribe(customers=>{
      this.customers = customers.items
      this.customerPerPage = customers.perPage
      this.totalItems = customers.totalItems
      this.totalPages = customers.totalPages
    });

  }

  getCustomers(){
    this.customerService.getCustomers().subscribe(customers=>{
      this.customers = customers.items
      this.customerPerPage = customers.perPage
      this.totalItems = customers.totalItems
      this.totalPages = customers.totalPages
    });
    
  }
  addCustomerWindow(){
    // console.log("prueba")
    if(this.addCustomerButton){
      this.addCustomerButton = false
    }else{
      this.addCustomerButton = true;
    }
    this.form = {
      name: "Name",
      lastName: "lastName",
      email: "email",
      birthday: new Date()
    } 
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
      this.getCustomers()
    })

    this.addCustomerWindow()
    
   return console.log(this.customer)
   
  }

  deleteCustomer(customer){
    console.log("el customer es:" + customer.lastName)
    
    this.customerService.deleteCustomers( customer.id
    ).subscribe(data=>{
      if(data == null){
        console.log("Se borro perfecto")
        this.getCustomers()

      }
      else{
        console.log(data)
      }
    })
  }

  editCustomerWindow(customer){
    if(this.editCustomerButton){
      this.editCustomerButton = false
    }else{
      this.editCustomerButton = true;
    }
    this.form = {
      id:customer.id,
      name: customer.name,
      lastName: customer.lastName,
      email: customer.email,
      birthday: new Date(customer.birthday)
    }
    }

  editCustomer(formEdit:NgForm){

  this.customer = formEdit.form.value;
  this.customer.birthday = new Date(formEdit.form.value.birthday).toISOString();


  this.customerService.editCustomers(
    {
         id: this.customer.id,
         name:this.customer.name,
         lastName: this.customer.lastName,
         email:    this.customer.email,
         birthday:  this.customer.birthday
    }
  ).subscribe(data=>{
    console.log(data)
    this.getCustomers()
    this.editCustomerWindow(this.customer)
  })
  console.log(this.customer)
} 
  }