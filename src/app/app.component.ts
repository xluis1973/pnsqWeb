import { Component, OnInit } from '@angular/core';
import { MensajesService } from './services/mensajes.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{
  constructor(private msnSrv:MensajesService) {
    msnSrv.requestPermission().then(token=>{
      console.log("Token ", token);
      
    })
  }
  ngOnInit(): void {
    this.msnSrv.recibeMensaje().subscribe(payload=>{
        console.log("Mensaje ",payload);
        
    });
}
}
