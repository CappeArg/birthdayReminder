import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Customer } from '../Interfaces/customers';
@Injectable({
  providedIn: 'root'
})
export class CustomersServiceService {

  path:string="http://127.0.0.1:8090/api/collections/customers/records"

  constructor(private http : HttpClient) { }


  getCustomers():Observable<any>{
     return this.http.get(this.path)
    }
  
  createCustomers(customer: Customer):Observable<any>{
    return this.http.post(this.path,customer)
  };

  editCustomers(customer:Customer):Observable<any>{
    return this.http.patch(this.path + "/" + customer.id, customer)
  }
//Maybe I can change an item like unvailable 
  deleteCustomers(id:string):Observable<any>{
    return this.http.delete(this.path + "/"+ id);
  }
  
  viewCustomer(id:string):Observable<any>{
    return this.http.get(this.path + "/" + id)
  }
}
