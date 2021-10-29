import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from 'src/environments/environment.prod';

//import * as firebase from 'firebase-admin/app';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
const app = initializeApp(firebaseConfig);

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
     }/*else {
      this.navCrl.navigateRoot('/monitoreo',{animated:true});
     }*/
     const auth = getAuth();
     //Para crear un nuevo usuario.
     createUserWithEmailAndPassword(auth, "javy@mercado.com", "12345678")
       .then((userCredential) => {
         // Signed in
         const user = userCredential.user;
         console.log('Exitoso ');
         console.log(user);
         // ...
       })
       .catch((error) => {
         const errorCode = error.code;
         const errorMessage = error.message;
         console.log('Error ');
         // ..
       });
    
     
   
  }


}
