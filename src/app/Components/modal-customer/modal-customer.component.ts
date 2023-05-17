import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Customer } from '../../Interfaces/customers';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from 'app/Services/customer.service';

@Component({
  selector: 'app-modal-customer',
  templateUrl: './modal-customer.component.html',
  styleUrls: ['./modal-customer.component.css']
})
export class ModalCustomerComponent implements OnInit {

  customer: any;
  collectionName:string = 'Customers';
  form:any;
  add:boolean = false;

  constructor(
    private service : CustomerService,
    private router:Router,
    private route:ActivatedRoute) { }

  async ngOnInit() {
  const customerId = this.route.snapshot.paramMap.get('id');
  if (customerId === null) {
    this.add=true;
    this.form = {
      name: "name",
      lastName:  "surname",
      email: "email",
      birthday: new Date()
    };   
  } else {
    this.service.get(customerId, this.collectionName).subscribe(
      data=>{this.customer =  data
    this.form = {
      name: this.customer.name,
      lastName: this.customer.lastName,
      email: this.customer.email,
      birthday: this.customer.birthday
    };   
      },
      err=>{
        Swal.fire('', `the server wasn't process the request: ${err}`, 'error');
      }
    );
  }
}

  async addCustomerForm(formAdd: NgForm) {
    const customer = formAdd.form.value;
    try {
      this.service.add(customer, this.collectionName);
      Swal.fire('', 'The customer was add succesfully', 'success');
      setTimeout(() => {
        this.router.navigate(['/customers']);
      }, 500);
    } catch (error) {
        Swal.fire('', `the server wasn't process the request ${error}`, 'error');
      } 
    }
  

  async editCustomerForm(formEdit:NgForm){
    try {
      this.customer = formEdit.form.value;
      this.customer.id = this.route.snapshot.paramMap.get('id')

      const response = await this.service.update(this.customer, this.collectionName)

      Swal.fire('', 'The customer was edit succesfully', 'success');
      setTimeout(() => {
        this.router.navigate(['/customers']);
      }, 500);
    } catch (error) {
      Swal.fire('', "the server wasn't process the request", 'error');
      console.error(error)
    }
  }

}