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
  public btSelectM:String="solid";
  public btSelectS:String="outline";
  public btSelectH:String="outline";
  public btSelectB:String="outline";
  public fechaBuscar:any;
  public publicaciones:Publicacion[]=[];
 
 
  onClickM(){
    this.btSelectM="solid";
    this.btSelectS="outline";
    this.btSelectH="outline";
    this.btSelectB="outline";
    this.limpiarCampos();
      
    }
onClickS(){
  this.btSelectM="outline";
  this.btSelectS="solid";
  this.btSelectH="outline";
  this.btSelectB="outline";  
 
}   
onClickH(){
  this.btSelectM="outline";
  this.btSelectS="outline";
  this.btSelectH="solid";
  this.btSelectB="outline";  
 
}
onClickB(){
  this.btSelectM="outline";
  this.btSelectS="outline";
  this.btSelectH="outline";
  this.btSelectB="solid";  
 
}
  
  ngOnInit() {
    const hoy:Date=new Date();
    this.fechaBuscar=hoy.getFullYear()+"-"+(hoy.getMonth()+1)+"-"+hoy.getDate();

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
    this.pblService.notificacionesPush();
  
   
    
  }

  async eliminarPublicacion(formulario:NgForm){
    this.publicacion.creador = await this.usuarioService.obtenerToken();

  
   this.publicacion.fechaCreacion=new Date();
   await this.pblService.eliminarPublicacion(this.publicacion);
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
      creador:"",
      vence:""
    
     };
     this.btSelectM="solid";
    this.btSelectS="outline";
    this.btSelectH="outline";
    this.btSelectB="outline";
  }

  public buscarPorFecha(){
    console.log(this.fechaBuscar);
    console.log(new Date(this.fechaBuscar));

    this.pblService.obtenerPublicaciones(new Date(this.fechaBuscar)).then((resp)=>{
      this.publicaciones=resp as Publicacion[];
    });
  }
  public mostrar(publicacion:Publicacion){
    
    this.publicacion=publicacion;
    this.btSelectM="outline";
    this.btSelectS="solid";
    this.btSelectH="outline";
    this.btSelectB="outline";  
  }
}
