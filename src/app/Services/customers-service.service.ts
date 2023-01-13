import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Customer } from '../Interfaces/customers';
@Injectable({
  providedIn: 'root'
})
export class CustomersServiceService {

  constructor(private http : HttpClient) { }

  getCustomers():Observable<any>{
     return this.http.get("http://127.0.0.1:8090/api/collections/customers/records")
    }
  
  createCustomers(customer: Customer):Observable<any>{
    return this.http.post("http://127.0.0.1:8090/api/collections/customers/records",customer)
  };

  editCustomers(customer:Customer):Observable<any>{
    return this.http.patch("http://127.0.0.1:8090/api/collections/customers/records/:id",customer, {
      params: {
        path: customer.id
      }
    })
  }



  }
