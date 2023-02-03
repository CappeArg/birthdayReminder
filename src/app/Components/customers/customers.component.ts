import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Customer } from 'src/app/Interfaces/customers';

import { CustomersServiceService } from '../../Services/customers-service.service';
import { BirthdayCardServiceService } from '../../Services/birthday-card-service.service';
import { map } from 'rxjs';

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

  constructor(private customerService : CustomersServiceService,
              private birthdayService: BirthdayCardServiceService) { }

              ngOnInit() {
                this.customerService.getCustomers()
                .pipe(map(customers => {
                this.extractCustomersData(customers);
                this.birthdayService.changeCustomerBirthday(this.customers);
                })).subscribe();
                }
  private extractCustomersData(customers) {
    this.customers = customers.items;
    this.customerPerPage = customers.perPage;
    this.totalItems = customers.totalItems;
    this.totalPages = customers.totalPages;
  }
  
  getCustomers() {
    this.customerService.getCustomers()
      .subscribe(customers => this.extractCustomersData(customers));
  }
  AddCustomerWindow() {
    this.addCustomerButton = !this.addCustomerButton;
    this.form = {
      name: 'Name',
      lastName: 'Last Name',
      email: 'Email',
      birthday: new Date(),
    };
  }
  addCustomerForm(formAdd: NgForm) {
    const customer = formAdd.form.value;
    customer.birthday = new Date(customer.birthday).toISOString();
    this.customerService.createCustomers(customer)
      .subscribe(() => {
        this.getCustomers();
        this.AddCustomerWindow();
      });
  }  

  deleteCustomer(customer:Customer) {
    this.customerService.deleteCustomers(customer.id).subscribe(res => {
      if (!res) {
        console.log("Deleted successfully");
        this.getCustomers();
      } else {
        console.log(res);
      }
    });
  }

  EditWindow(customer) {
    this.editCustomerButton = !this.editCustomerButton;
    this.form = {
      id: customer.id,
      name: customer.name,
      lastName: customer.lastName,
      email: customer.email,
      birthday: new Date(customer.birthday)
    };
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
    this.EditWindow(this.customer)
  })
  console.log(this.customer)
} 
  }