import { Injectable } from '@angular/core';
import { initializeApp} from 'firebase/app';

import {   getMessaging, getToken, Messaging, onMessage } from "firebase/messaging";
import { Observable } from 'rxjs';

import { firebaseConfig } from 'src/environments/environment.prod';


const app = initializeApp(firebaseConfig);

@Injectable({
  providedIn: 'root'
})
export class MensajesService {

  messaging:Messaging=null;
  constructor() { 

    this.messaging=getMessaging(app);
  }

private observaMensaje= new Observable(observe=>{

  console.log("En observable");
  onMessage(this.messaging,payload=>{
    
      console.log("Por devolver.");
      
    observe.next(payload);
  });

 
});


recibeMensaje(){
  return this.observaMensaje;
}

  requestPermission=()=>{
    return new Promise(async (resolve , reject)=>{
        const perm= await Notification.requestPermission();
        if(perm==="granted"){
          const tokenFire= await getToken(this.messaging);
          resolve(tokenFire);
        } else {
          reject(new Error("Sin Permisos"));
        }

    });
  }








  
}
