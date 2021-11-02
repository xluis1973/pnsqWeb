import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Guia, Usuario } from 'src/app/interfaces/interfaces';
import { AlertasService } from 'src/app/services/alertas.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
  public btSelectN:String="outline";
  public btSelectE:String="outline";
  public btSelectD:String="outline";
  public btSelectB:String="outline";

  constructor(private usuarioService:UsuarioService, private alertasService:AlertasService) { }

  usuario:Usuario={
    identificador:"",
    apellido:"",
    nombre:"",
    domicilio:"", 
    ciudad:"",
    telefono:"",
    activo:true  };

  guia:Guia={
    identificador:"",
    usuario: "",
    cuil: "",
    nroHabiliatacion:-1,
    fHabilitacion: null,
    vtoHabilitacion:null,
    email:"",
    password:""
  };
  ngOnInit() {
  }

  //Nuevo
  onClickN(){
    this.btSelectN="solid";
    this.btSelectE="outline";
    this.btSelectD="outline";   
    this.btSelectB="outline";   
    }
    //Editar
onClickE(){
  this.btSelectN="outline";
  this.btSelectE="solid";
  this.btSelectD="outline";   
  this.btSelectB="outline";  
}   
//Borrar
onClickD(){
  this.btSelectN="outline";
  this.btSelectE="outline";
  this.btSelectD="solid";   
  this.btSelectB="outline";  
}
//Buscar
onClickB(){
  this.btSelectN="outline";
  this.btSelectE="outline";
  this.btSelectD="outline";   
  this.btSelectB="solid";  
}

async crearUsuario(formulario:NgForm){
  const resp:boolean = await this.usuarioService.crearUsuario(this.guia.email,this.guia.password);
  if(resp){

        await this.alertasService.presentAlert("Usuario Registrado Exitosamente");
        
  } else {
    await this.alertasService.presentAlert("El Usuario ya Existe");
   
  }
  this.limpiarUsuario();

}

limpiarUsuario(){
  this.usuario.apellido="";
  this.usuario.nombre="";
  this.usuario.ciudad="";
  this.usuario.domicilio="";
  this.usuario.telefono="";
  this.guia.cuil="";
  this.guia.email="";
  this.guia.nroHabiliatacion=0;
  this.guia.password="";
  this.guia.fHabilitacion=null;
  this.guia.vtoHabilitacion=null;
}

}
