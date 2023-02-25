import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import PocketBase from 'pocketbase';

import { Customer } from '../Interfaces/customers';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CustomersServiceService {

  url:string = environment.URLBASE
  pb = new PocketBase(this.url);
  

  

  constructor() { }


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
