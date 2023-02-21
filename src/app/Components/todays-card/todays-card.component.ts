import { Component, OnInit } from '@angular/core';
import { CustomersServiceService } from '../../Services/customers-service.service';

@Component({
  selector: 'app-todays-card',
  templateUrl: './todays-card.component.html',
  styleUrls: ['./todays-card.component.css']
})
export class TodaysCardComponent implements OnInit {
  
  customers:any[];
  birthdayCards:any[];

  today = new Date().toISOString();

  constructor(private CustomersService: CustomersServiceService){
    
   }

   async ngOnInit() {   
    const allCustomers = await this.CustomersService.getRecords();
    const todayMonth = this.today.slice(5, 7);
    this.customers = allCustomers.filter(customer => {
      const customerMonth = customer['birthday'].slice(5, 7);
      return customerMonth === todayMonth;
    });
  }

  }

