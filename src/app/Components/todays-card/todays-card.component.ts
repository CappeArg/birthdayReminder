import { Component, OnInit, ElementRef } from '@angular/core';
import { CustomersServiceService } from '../../Services/customers-service.service';
import html2canvas from 'html2canvas';
import { CustomerService } from 'app/Services/customer.service';

@Component({
  selector: 'app-todays-card',
  templateUrl: './todays-card.component.html',
  styleUrls: ['./todays-card.component.css']
})
export class TodaysCardComponent implements OnInit {
  
  customers:any[];
  birthdayCards:any[];
  collectionName:string="Customers";

  today = new Date().toISOString();

  constructor(
    // private CustomersService: CustomersServiceService,
              private service: CustomerService){
    
   }

   async ngOnInit() {
    await this.service.getAll(this.collectionName).subscribe(data => {
      this.customers = data;
      console.log(data);
  
      const todayMonth = this.today.slice(5, 10);
      console.log(todayMonth);
  
      this.customers = this.customers.filter(customer => {
        const customerBirthday = customer['birthday'].slice(5, 10);
        return customerBirthday === todayMonth;
      });
    });
  }
  downloadImage(n) {
    // Selecciona el elemento HTML que deseas convertir en una imagen
    const element = document.getElementById(n) as HTMLElement
    
    // Utiliza html2canvas para convertir el elemento en una imagen
    html2canvas(element).then((canvas) => {
      // Convierte el canvas en una imagen
      const image = canvas.toDataURL('image/png');
      
      // Crea un enlace para descargar la imagen
      const link = document.createElement('a');
      link.download = 'my-image.png';
      link.href = image;
      document.body.appendChild(link);
      
      // Hace clic en el enlace para descargar la imagen
      link.click();
      
      // Elimina el enlace del DOM
      document.body.removeChild(link);
    });
  }

}

  