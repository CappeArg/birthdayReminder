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
  customers: any [];
  customerPerPage: number;
  totalItems:number;
  totalPages:number;

  constructor(private customerService : CustomersServiceService) { }

 async ngOnInit() {

    await this.getCustomers()

    this.customerPerPage, this.totalItems = this.customers.length
  }

  
   async getCustomers() {
    this.customers = await this.customerService.getRecords();
    this.customers.forEach(element => {
      element.birthday = new Date(element.birthday).toISOString().replace("T00:00:00.000Z", "").replace(" 00:00:00.000Z", "");
    });
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
      const res = await this.customerService.deleteRecord(customer.id);
      if (this.okDelete(customer.id, this.customers)) {
        await Swal.fire(
          'Deleted',
          'The customer was delete successfully.',
          'success'
        );
        this.getCustomers()
      } else {
        await Swal.fire(
          'Error',
          'Error, please try again',
          'error'
        );  
      }
    }
 
  }

  okDelete(idSearch, customers){
   return customers.find(customer => customer.id === idSearch);
  }

  }