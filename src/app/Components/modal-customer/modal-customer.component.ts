import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Customer } from '../../Interfaces/customers';
import { CustomersServiceService } from '../../Services/customers-service.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-modal-customer',
  templateUrl: './modal-customer.component.html',
  styleUrls: ['./modal-customer.component.css']
})
export class ModalCustomerComponent implements OnInit {

  customer: Customer;
  form:any;

  constructor(private customerService: CustomersServiceService,
              private router:Router,
              private route:ActivatedRoute) { }

  ngOnInit(): void {
    
    const customerId = this.route.snapshot.paramMap.get('id');
    if(customerId === null){
    this.form = {
      name: 'Name',
      lastName: 'Last Name',
      email: 'Email',
      birthday: new Date(),
    };
  }else{
    this.customerService.viewCustomer(customerId).subscribe((data)=>{
      this.form={
        name: data.name,
        lastName: data.lastName,
        email: data.email,
        birthday: new Date(data.birthday).toLocaleDateString().split('/').sort().concat('/')
      }
    })
  }

  }


  async addCustomerForm(formAdd: NgForm) {
    const customer = formAdd.form.value;
    customer.birthday = new Date(customer.birthday).toISOString();
    try {
    await this.customerService.createCustomers(customer).toPromise();
    Swal.fire('', 'The customer was add succesfully', 'success');
    setTimeout(() => {
      this.router.navigate(['/customers']);
    }, 500);
    } catch (error) {
    if (error.status === 400) {
    Swal.fire('', "the server wasn't process the request", 'error');
    } else {
    console.error(error);
    }
    }
    }    

  // EditWindow(customer) {
  //   this.form = {
  //     id: customer.id,
  //     name: customer.name,
  //     lastName: customer.lastName,
  //     email: customer.email,
  //     birthday: new Date(customer.birthday)
  //   };
  // }

  async editCustomer(formEdit:NgForm){
    try {
      this.customer = formEdit.form.value;
      this.customer.birthday = new Date(formEdit.form.value.birthday).toISOString();
  
      const response = await this.customerService.editCustomers({
        id: this.customer.id,
        name:this.customer.name,
        lastName: this.customer.lastName,
        email:    this.customer.email,
        birthday:  this.customer.birthday
      }).toPromise();
  
      console.log(response);
      Swal.fire('', 'The customer was edit succesfully', 'success');
      setTimeout(() => {
        this.router.navigate(['/customers']);
      }, 500);
    } catch (error) {
      Swal.fire('', "the server wasn't process the request", 'error');
      console.error(error);
    }
  
    console.log(this.customer);
  }

}
