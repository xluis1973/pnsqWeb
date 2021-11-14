import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { NavController } from '@ionic/angular';
import { Publicacion } from 'src/app/interfaces/interfaces';

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

  constructor() {

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

  }
   crearPublicacion(formulario:NgForm){

    this.publicacion.creador="";
    this.publicacion.identificador="";
    this.publicacion.cuerpo="";
    this.publicacion.fechaCreacion=null;
    this.publicacion.fechaVto=new Date();
    this.publicacion.titulo="";
 
    
  }
}
