import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AlertasService } from 'src/app/services/alertas.service';
import { UsuarioService } from 'src/app/services/usuario.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})



export class LoginPage implements OnInit {
private res:boolean;
 

  loginUser={
    email:'luis@mercado.com',
    password:'123456'
  };
  constructor(private  navCrl:NavController,private userServ:UsuarioService, private alertasService:AlertasService) { }

  ngOnInit() {
  }

  async login(flogin:NgForm){
     if(flogin.invalid){
       return;
     }else {
       this.res= await this.userServ.login(this.loginUser.email,this.loginUser.password);
       if(this.res){

                this.navCrl.navigateRoot('/monitoreo',{animated:true});

       }else {
         this.alertasService.presentAlert("Usuario y/contraseña incorrecta");
       }
      
     }
     
    
     
   
  }


}
