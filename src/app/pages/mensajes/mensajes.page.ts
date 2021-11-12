import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Mensaje } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-mensajes',
  templateUrl: './mensajes.page.html',
  styleUrls: ['./mensajes.page.scss'],
})
export class MensajesPage implements OnInit, AfterViewInit {

  constructor() { }
 
;

  mensajes:Mensaje[]=[

    {
      identificador:"leida",
    mensaje:"/assets/icon/policia.png",
    remitente:"Antonio Videla",
    fechaEnvio:new Date(),
    ultimaUbicacion:""
    },
    

  ];
  ngOnInit() {
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
     
      this.mensajes.push({
        identificador:"nueva",
      mensaje:"/assets/icon/fuego.png",
      remitente:"Gabriela Sartoris",
      fechaEnvio:new Date(),
      ultimaUbicacion:""
      });
      
}, 3000);

  }

}
