import { Component, OnInit } from '@angular/core';
import { BirthdayCardServiceService } from '../../Services/birthday-card-service.service';

@Component({
  selector: 'app-birthday-card',
  templateUrl: './birthday-card.component.html',
  styleUrls: ['./birthday-card.component.css']
})
export class BirthdayCardComponent implements OnInit {

  constructor(private birthdayService:BirthdayCardServiceService) { }

  ngOnInit(): void {
    this.birthdayService.todayBirthdays.subscribe(customers => {
      console.log("Recibiendo datos")
      console.log(customers)
    })
  }

}
