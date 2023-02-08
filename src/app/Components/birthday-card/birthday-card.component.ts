import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/Interfaces/customers';

@Component({
  selector: 'app-birthday-card',
  templateUrl: './birthday-card.component.html',
  styleUrls: ['./birthday-card.component.css']
})
export class BirthdayCardComponent implements OnInit {

  birthdayCards:Customer[];
  constructor() { }

  ngOnInit(): void {


    
    
  }

}
