import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-lateral',
  templateUrl: './lateral.component.html',
  styleUrls: ['./lateral.component.scss'],
})
export class LateralComponent implements OnInit {

  constructor(private  navCrl:NavController, private userSrv:UsuarioService) { }

  ngOnInit() {}

  monitoreo(){
    this.navCrl.navigateRoot('/monitoreo',{animated:true});
  }

  administracion(){
    this.navCrl.navigateRoot('/admin',{animated:true});
  }

  publicar(){
    this.navCrl.navigateRoot("/publicar",{animated:true});
  }
  mensajes(){
    this.navCrl.navigateRoot("/mensajes",{animated:true});
  }
  reportes(){
    this.navCrl.navigateRoot("/reportes",{animated:true});
  }

  cerrarSesion(){
    this.userSrv.cerrarSesion();
    this.navCrl.navigateRoot("/",{animated:true});

  }
}
