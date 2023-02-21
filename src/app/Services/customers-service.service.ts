import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import PocketBase from 'pocketbase';

import { Customer } from '../Interfaces/customers';
@Injectable({
  providedIn: 'root'
})
export class CustomersServiceService {

  path:string="http://127.0.0.1:8090/api/collections/customers/records"
  pb = new PocketBase('http://127.0.0.1:8090');

  

  constructor(private http : HttpClient) { }


  getRecords(){
    return this.pb.collection('customers').getFullList(200 /* batch size */, {
      sort: '-created',
  });
  } 

   deleteRecord(id){
    return this.pb.collection('customers').delete(id);
   }

   createRecord(customer: Customer){
    return this.pb.collection('customers').create(customer);
   } 


  editRecord(customer:Customer){
    return this.pb.collection('customers').update(customer.id, customer);
  }
  
  viewRecord(id:string){
    return this.pb.collection('customers').getOne(id);
  }

}
