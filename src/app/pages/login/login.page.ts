import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginUser={
    email:'mercado@mail.com',
    password:'123'
  };
  constructor(private  navCrl:NavController) { }

  ngOnInit() {
  }

  async login(flogin:NgForm){
     if(flogin.invalid){
       return;
     }else {
      this.navCrl.navigateRoot('/monitoreo',{animated:true});
     }
      
      
  }
}
