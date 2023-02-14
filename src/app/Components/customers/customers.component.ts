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


  customer: Customer;
  customers: Customer[];
  customerPerPage: number;
  totalItems:number;
  totalPages:number;
  addCustomerButton:boolean=false;
  editCustomerButton:boolean=false;

  constructor(private customerService : CustomersServiceService) { }

  ngOnInit() {


    this.customerService.getCustomers().subscribe(({ items, perPage, totalItems, totalPages }) => {
      this.customers = items;
      this.customerPerPage = perPage;
      this.totalItems = totalItems;
      this.totalPages = totalPages;
      
    });

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


  }