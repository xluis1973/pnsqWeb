import { Injectable } from '@angular/core';
import { initializeApp} from 'firebase/app';

import {   getMessaging, getToken, Messaging, onMessage } from "firebase/messaging";
import { getFirestore, getDocs, collection,setDoc,doc, query, where, getDoc, addDoc, deleteDoc } from 'firebase/firestore/lite';
import { Observable } from 'rxjs';

import { firebaseConfig } from 'src/environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

@Injectable({
  providedIn: 'root'
})
export class MensajesService {

  messaging:Messaging=null;
  constructor(private http:HttpClient) { 

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
         
          this.guardaEnBDNotiKey(tokenFire);
          resolve(tokenFire);
        } else {
          reject(new Error("Sin Permisos"));
        }

    });
  }





async guardaEnBDNotiKey(notiKey:string){
  console.log("Guardando en BD");

  const grupoWebCol=doc(db, "grupoWeb",notiKey );
    await setDoc(grupoWebCol, {notification_key:notiKey}).catch((error)=>{
  
      console.log('Error al guardar Usuario ',error.message);
  
    });

}
 

async borrarEnBDNotiKey(notiKey:string){

  

  const grupoWebCol=doc(db, "grupoWeb",notiKey );
  await deleteDoc(grupoWebCol);
  
}
}
