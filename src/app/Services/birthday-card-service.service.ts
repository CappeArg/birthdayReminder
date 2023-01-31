import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BirthdayCardServiceService {

  @Output() todayBirthdays:EventEmitter<any> = new EventEmitter
  

  constructor() { }
  
}
