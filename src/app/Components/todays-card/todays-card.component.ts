import { Component, OnInit, ElementRef } from '@angular/core';
import { CustomersServiceService } from '../../Services/customers-service.service';
import html2canvas from 'html2canvas';

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

    this.customers.forEach(element=>{
      element.birthday = new Date(element.birthday).toISOString().replace("T00:00:00.000Z", "").replace(" 00:00:00.000Z", "");
    })
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

