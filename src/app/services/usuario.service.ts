import { PropertyRead } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from 'src/environments/environment.prod';
const app = initializeApp(firebaseConfig);
const auth = getAuth();
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor() { }

 async login(email:string,password:string):Promise<boolean>{

          
  return new Promise(resolve=>{

    signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            resolve(true);
            // ...
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            resolve(false);
          });


  });


        

}



}
