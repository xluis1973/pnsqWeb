import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-lateral',
  templateUrl: './lateral.component.html',
  styleUrls: ['./lateral.component.scss'],
})
export class LateralComponent implements OnInit {

  constructor(private  navCrl:NavController) { }

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
}
