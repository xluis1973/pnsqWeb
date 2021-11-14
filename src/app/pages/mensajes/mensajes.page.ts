import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Mensaje } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-mensajes',
  templateUrl: './mensajes.page.html',
  styleUrls: ['./mensajes.page.scss'],
})
export class MensajesPage implements OnInit, AfterViewInit {
   btSelectM:String="outline";
   btSelectS:String="outline";
   btSelectH:String="outline";
  constructor() { }
 
  onClickM(){
    this.btSelectM="solid";
    this.btSelectS="outline";
    this.btSelectH="outline";
      
    }
onClickS(){
  this.btSelectM="outline";
  this.btSelectS="solid";
  this.btSelectH="outline";  
 
}   
onClickH(){
  this.btSelectM="outline";
  this.btSelectS="outline";
  this.btSelectH="solid";  
 
}

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
