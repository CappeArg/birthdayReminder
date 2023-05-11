import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Customer } from '../../Interfaces/customers';
import { CustomersServiceService } from '../../Services/customers-service.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from 'src/app/Services/customer.service';



@Component({
  selector: 'app-modal-customer',
  templateUrl: './modal-customer.component.html',
  styleUrls: ['./modal-customer.component.css']
})
export class ModalCustomerComponent implements OnInit {

  customer: any;
  collectionName:string = 'customers'
  form:any;
  add:boolean = false;

  constructor(private customerService: CustomersServiceService,
              private service: CustomerService,
              private router:Router,
              private route:ActivatedRoute) { }

 async ngOnInit() {
    
    
    const customerId = this.route.snapshot.paramMap.get('id');
    if(customerId === null){
    this.add=true
    this.form = {
      name: 'Name',
      lastName: 'Last Name',
      email: 'Email',
      birthday: new Date(),
    };
  }else{
    this.service.get(customerId,this.collectionName).subscribe(data=>{
      Swal.showLoading()
      this.customer = data
      this.form = {
        name: this.customer.name,
        lastName: this.customer.lastName,
        email: this.customer.email,
        birthday: this.customer.birthday
      }
      Swal.close()
    //  this.customer = await this.customerService.viewRecord(customerId);
    //  console.log(this.customer)
    //  const date = new Date( this.customer.birthday ).toISOString().replace("T00:00:00.000Z", "").replace(" 00:00:00.000Z", "");
    //   this.form={
    //     name: this.customer.name,
    //     lastName: this.customer.lastName,
    //     email: this.customer.email,
    //     birthday: date
    //   }

  }

  }

  async addCustomerForm(formAdd: NgForm) {
    const customer = formAdd.form.value;
    customer.birthday = new Date(customer.birthday).toISOString();
    try {
    await this.customerService.createRecord(customer);
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


  async editCustomerForm(formEdit:NgForm){
    try {
      this.customer = formEdit.form.value;
      this.customer.id = this.route.snapshot.paramMap.get('id')
      this.customer.birthday = new Date(formEdit.form.value.birthday).toISOString().replace("T00:00:00.000Z", "").replace(" 00:00:00.000Z", "");
  
      const response = await this.customerService.editRecord(
        this.customer
      )
  
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
}
