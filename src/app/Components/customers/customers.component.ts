import { Component, OnInit } from '@angular/core';


import { CustomersServiceService } from '../../Services/customers-service.service';

import Swal from 'sweetalert2';
// import { CustomerService } from 'src/app/Services/customer.service';
import { Customer } from 'app/Interfaces/customers';
import { CustomerService } from 'app/Services/customer.service';


@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  // list:Customer[];
  collectionName:string = "Customers"

  customer: Customer;
  customers: any [];
  customerPerPage: number;
  totalItems:number;
  totalPages:number;

  constructor(
    // private customerService : CustomersServiceService,
              private service: CustomerService) { }

 async ngOnInit() {

    await this.getAllCustomers()

    this.customerPerPage, this.totalItems = this.getAllCustomers.length
  }

  
  //  async getCustomers() {
  //   this.customers = await this.customerService.getRecords();
  //   this.customers.forEach(element => {
  //     //Ver de pasar UTC (toUTCString)
  //     element.birthday = new Date(element.birthday).toISOString().replace("T00:00:00.000Z", "").replace(" 00:00:00.000Z", "");
  //   });
  // }

  getAllCustomers(){
    Swal.showLoading()
    this.service.getAll(this.collectionName).subscribe(data=>{
      this.customers = data;
      Swal.close()
    },
    error => {
      Swal.fire(
        'Error',
        "Sorry, we couldn't complete your request",
        'error'
      );
    })
  }
  
  async onClickDelete(customer: Customer){
    
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
      const response= await this.service.delete(customer, this.collectionName);
      console.log(response)
      if (response == undefined) {
        await Swal.fire(
          'Deleted',
          'The service was delete successfully.',
          'success'
        );
   } else {
        await Swal.fire(
          'Error',
          'Error, please try again',
          'error'
        )
      }
    }


  }

  // async deleteCustomer(customer: Customer) {
  //   const result = await Swal.fire({
  //     title: 'Are you really sure about it?',
  //     text: "You won't be able to undo the action",
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonColor: '#3085d6',
  //     cancelButtonColor: '#d33',
  //     confirmButtonText: 'Yes, Delete',
  //     cancelButtonText: 'Cancel'
  //   });
  
  //   if (result.isConfirmed) {
  //     const res = await this.customerService.deleteRecord(customer.id);
  //     if (this.okDelete(customer.id, this.customers)) {
  //       await Swal.fire(
  //         'Deleted',
  //         'The customer was delete successfully.',
  //         'success'
  //       );
  //       this.getCustomers()
  //     } else {
  //       await Swal.fire(
  //         'Error',
  //         'Error, please try again',
  //         'error'
  //       );  
  //     }
  //   }
 
  // }

  // okDelete(idSearch, customers){
  //  return customers.find(customer => customer.id === idSearch);
  // }

  }