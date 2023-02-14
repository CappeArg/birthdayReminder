import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Customer } from '../../Interfaces/customers';
import { CustomersServiceService } from '../../Services/customers-service.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-modal-customer',
  templateUrl: './modal-customer.component.html',
  styleUrls: ['./modal-customer.component.css']
})
export class ModalCustomerComponent implements OnInit {

  customer: Customer;
  form:any;

  constructor(private customerService: CustomersServiceService) { }

  ngOnInit(): void {
    this.form = {
      name: 'Name',
      lastName: 'Last Name',
      email: 'Email',
      birthday: new Date(),
    };
    
  }


  async addCustomerForm(formAdd: NgForm) {
    const customer = formAdd.form.value;
    customer.birthday = new Date(customer.birthday).toISOString();
    try {
    await this.customerService.createCustomers(customer).toPromise();
    Swal.fire('', 'The customer was add succesfully', 'success');
    } catch (error) {
    if (error.status === 400) {
    Swal.fire('', 'El servidor no pudo procesar la solicitud', 'error');
    } else {
    console.error(error);
    }
    }
    }    

  EditWindow(customer) {
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
    // this.getCustomers()
    this.EditWindow(this.customer)
  })
  console.log(this.customer)
} 

}
