import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Timestamp } from 'firebase/firestore/lite';
import { Mensaje } from 'src/app/interfaces/interfaces';
import { MensajesService } from 'src/app/services/mensajes.service';


@Component({
  selector: 'app-mensajes',
  templateUrl: './mensajes.page.html',
  styleUrls: ['./mensajes.page.scss'],
})
export class MensajesPage implements OnInit, AfterViewInit {
   btSelectM:String="outline";
   btSelectS:String="outline";
   btSelectH:String="outline";
  constructor(private msnSrv:MensajesService) { }
 
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

  mensajes:Mensaje[]=[];
  async ngOnInit() {
    this.msnSrv.recibeMensaje().subscribe(payload=>{
      console.log("Mensaje ",payload);
      this.msnSrv.obtenerUltimoMesaje().then(mensaje=>{
        const tipo=payload.notification.body;
        mensaje.identificador="nueva";
    
        if(tipo==="Médico"){
          mensaje.mensaje="/assets/icon/auxilio.png"
        } else if(tipo==="Policía"){
          mensaje.mensaje="/assets/icon/policia.png"
        } else if(tipo==="Incendio"){
          mensaje.mensaje="/assets/icon/fuego.png"
        }

        this.mensajes.push(mensaje);

      });
      
      
  });

  }

  ngAfterViewInit(): void {
    /*
    setTimeout(() => {
     
      this.mensajes.push({
        identificador:"nueva",
      mensaje:"/assets/icon/fuego.png",
      remitente:"Gabriela Sartoris",
      fechaEnvio:new Date(),
      ultimaUbicacion:""
      });
      
}, 3000);
*/
  }

}
