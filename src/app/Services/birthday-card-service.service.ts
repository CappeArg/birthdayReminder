import { Injectable } from '@angular/core';
import { from } from 'rxjs';
import { Customer } from '../Interfaces/customers';

@Injectable({
  providedIn: 'root'
})
export class BirthdayCardServiceService {


constructor(){
  
}
private customersBirthday:Customer[]= [];

getCustomersBirthday(){
  return from(this.customersBirthday)
}


changeCustomerBirthday(newList: Customer[]){
  this.customersBirthday.splice(0,this.customersBirthday.length);
  console.log("esto está andando?")
  return (this.customersBirthday = newList)
  
}



}
