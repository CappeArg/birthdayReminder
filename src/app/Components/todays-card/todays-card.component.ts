import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/Interfaces/customers';
import { BirthdayCardServiceService } from '../../Services/birthday-card-service.service';

@Component({
  selector: 'app-todays-card',
  templateUrl: './todays-card.component.html',
  styleUrls: ['./todays-card.component.css']
})
export class TodaysCardComponent implements OnInit {
  
  birthdayCards:Customer[];
  constructor(private birthdayService:BirthdayCardServiceService) { }

  ngOnInit(): void {
    this.birthdayService.todayBirthdays.subscribe(customers => {
      this.birthdayCards = customers;
      console.log(this.birthdayCards);
    })
     
  }
}
