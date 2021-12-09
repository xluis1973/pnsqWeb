import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { NavController } from '@ionic/angular';
import { Publicacion } from 'src/app/interfaces/interfaces';
import { PublicarService } from 'src/app/services/publicar.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-publicar',
  templateUrl: './publicar.page.html',
  styleUrls: ['./publicar.page.scss'],
})
export class PublicarPage implements OnInit {
  
 publicacion:Publicacion={
  identificador:"",
  titulo:"",
  cuerpo:"",
  urlImagen:"",
  fechaCreacion:null, 
  fechaVto: null,
  creador:""

 };

  constructor(private pblService:PublicarService, private usuarioService:UsuarioService) {

  }
  public btSelectM:String="outline";
  public btSelectS:String="outline";
  public btSelectH:String="outline";
 
 
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
  
  ngOnInit() {
  }

  loadImageFromDevice(event){

    console.log(event.target.files[0]);
    this.pblService.guardarImage(event.target.files[0]);
  }
   async crearPublicacion(formulario:NgForm){
     this.publicacion.creador = await this.usuarioService.obtenerToken();

   
    this.publicacion.fechaCreacion=new Date();
    await this.pblService.enviarPublicacion(this.publicacion);
    this.limpiarCampos();
  
  
 
    
  }
  limpiarCampos(){
    this.publicacion={
      identificador:"",
      titulo:"",
      cuerpo:"",
      urlImagen:"",
      fechaCreacion:null, 
      fechaVto: null,
      creador:""
    
     };
  }
}
