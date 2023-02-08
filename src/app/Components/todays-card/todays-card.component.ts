import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/Interfaces/customers';
import { CustomersServiceService } from '../../Services/customers-service.service';

@Component({
  selector: 'app-todays-card',
  templateUrl: './todays-card.component.html',
  styleUrls: ['./todays-card.component.css']
})
export class TodaysCardComponent implements OnInit {
  
  customers:Customer[];
  birthdayCards:Customer[];

  today = new Date().toISOString();

  constructor(private CustomersService: CustomersServiceService){
    
   }

  ngOnInit(): void {   
    this.CustomersService.getCustomers().subscribe(data => {
      this.customers = data.items;
      console.log(this.customers);
      for (let i = 0; i < this.customers.length; i++) {
        if (this.customers[i].birthday.slice(5, 7) !== this.today.slice(5, 7)) {
          this.customers.splice(i, 1);
          i--;
        }
      }
    });
  }

}

