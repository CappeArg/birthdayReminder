import { Injectable } from '@angular/core';
export interface Customer {
  id: string,
  name: string,
  lastName: string,
  email: string,
  birthday: string,
}

@Injectable({
  providedIn: 'root'
})
export class CustomersServiceService {

  constructor() { }
}
