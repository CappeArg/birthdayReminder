import { Component, OnInit } from '@angular/core';

import { Customer } from 'src/app/Interfaces/customers';

import { CustomersServiceService } from '../../Services/customers-service.service';

import Swal from 'sweetalert2';


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
  
  async getCustomers() {
    const customers = await this.customerService.getCustomers().toPromise();
    this.extractCustomersData(customers);
  }
  

  async deleteCustomer(customer: Customer) {
    const result = await Swal.fire({
      title: 'Are you really sure about it?',
      text: "You won't be able to undo the action",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Delete',
      cancelButtonText: 'Cancel'
    });
  
    if (result.isConfirmed) {
      const res = await this.customerService.deleteCustomers(customer.id).toPromise();
      if (!res) {
        await Swal.fire(
          'Deleted',
          'The customer was delete successfully.',
          'success'
        );
        await this.getCustomers();
      } else {
        await Swal.fire(
          'Error',
          'Error, please try again',
          'error'
        );
      }
    }
  }


  }