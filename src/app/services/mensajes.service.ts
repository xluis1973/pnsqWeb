import { Injectable } from '@angular/core';
import { initializeApp} from 'firebase/app';

import {   getMessaging, getToken, Messaging, onMessage } from "firebase/messaging";
import { getFirestore, getDocs, collection,setDoc,doc, query, where, getDoc, addDoc } from 'firebase/firestore/lite';
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
    let notiKey:string="";
    return new Promise(async (resolve , reject)=>{
        const perm= await Notification.requestPermission();
        if(perm==="granted"){
          const tokenFire= await getToken(this.messaging);
           notiKey= await this.buscaGrupo().catch(error=>notiKey="*No Existe");
          
          if(notiKey.startsWith("*")){
            console.log("Crea y agrega");
            notiKey= await this.creaGrupoDeNotificacion();
            this.agregarTokenAGrupo(tokenFire,notiKey);
            this.guardaEnBDNotiKey(notiKey);
          }else {
            console.log("Solo agrega");
            this.agregarTokenAGrupo(tokenFire,notiKey);
            this.guardaEnBDNotiKey(notiKey);
          }
          resolve(tokenFire);
        } else {
          reject(new Error("Sin Permisos"));
        }

    });
  }





creaGrupoDeNotificacion():Promise<string>{

  const data =
    {
      operation: 'create',
      notification_key_name: 'GrupoWeb',
      registration_ids: []
    }
  


  const headers= new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization':'key=AAAAaLWopaA:APA91bHC-ubI9ojxhcL-t-sudGv9EmX9bz7-RyGQ0J47_pVtjQO4ATRrNpoO3UYUwqOMbPjc5ZDupMfH5gqIFK_BBL6nMD48q_nqUvjwonRAyre0gy9i_b2jk9eakDF4_Uc2_4Wz23vd',
    'project_id':'449724327328'
  
  });

  return new Promise<string>((resolve,reject)=>{
    console.log("Por crear");

    this.http.post("/fcm/notification",data,{headers:headers})
     .subscribe((resp:any)=>{

         console.log("Info del grupo ",resp);
         resolve(resp.notification_key);
  },(error)=>{
     
    reject(error);
  });



  } )

  
}

buscaGrupo():Promise<string>{

  console.log("Buscando grupo");
  const headers= new HttpHeaders({
    'Access-Control-Allow-Origin': 'http://localhost:8100/*',
    'Access-Control-Allow-Methods': '*',
    'Access-Control-Allow-Headers':'*',
    'Content-Type': 'application/json',
     'Authorization':'key=AAAAaLWopaA:APA91bHC-ubI9ojxhcL-t-sudGv9EmX9bz7-RyGQ0J47_pVtjQO4ATRrNpoO3UYUwqOMbPjc5ZDupMfH5gqIFK_BBL6nMD48q_nqUvjwonRAyre0gy9i_b2jk9eakDF4_Uc2_4Wz23vd',
    'project_id':'449724327328'
  
  });
  headers.set('Access-Control-Allow-Origin',"http://localhost:8100/");
  console.log("Headers ",headers);

  return new Promise<string>((resolve,reject)=>{

    
    
    this.http.get('https://fcm.googleapis.com/fcm/notification?notification_key_name=GrupoWeb',{headers:headers}).
    subscribe((resp:any)=>{

      resolve(resp.notification_key);

  },error=>{

    reject(new Error("*No Existe"));

  });

  });
  
}

agregarTokenAGrupo(tokenfire:string, notifiKey:string):Promise<string>{

  const data =
    {
      operation: 'add',
      notification_key_name: 'GrupoWeb',
      notification_key: notifiKey,
      registration_ids: [tokenfire]
    }
  


  const headers= new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization':'key=AAAAaLWopaA:APA91bHC-ubI9ojxhcL-t-sudGv9EmX9bz7-RyGQ0J47_pVtjQO4ATRrNpoO3UYUwqOMbPjc5ZDupMfH5gqIFK_BBL6nMD48q_nqUvjwonRAyre0gy9i_b2jk9eakDF4_Uc2_4Wz23vd',
    'project_id':'449724327328'
  
  });

  return new Promise<string>((resolve,reject)=>{

    this.http.post("/fcm/notification",data,{headers:headers})
     .subscribe((resp:any)=>{

         console.log("Info del grupo ",resp);
         resolve(resp.notification_key);
  },(error)=>{
    reject(new Error("*No Existe"));
  });



  } )

}
borrarTokenAGrupo(tokenfire:string, notifiKey:string):Promise<string>{

  const data =
    {
      operation: 'remove',
      notification_key_name: 'GrupoWeb',
      notification_key: notifiKey,
      registration_ids: [tokenfire]
    }
  


  const headers= new HttpHeaders({
    'Content-Type': 'application/json',
     'Authorization':'key=AAAAaLWopaA:APA91bHC-ubI9ojxhcL-t-sudGv9EmX9bz7-RyGQ0J47_pVtjQO4ATRrNpoO3UYUwqOMbPjc5ZDupMfH5gqIFK_BBL6nMD48q_nqUvjwonRAyre0gy9i_b2jk9eakDF4_Uc2_4Wz23vd',
    'project_id':'449724327328'
  
  });

  return new Promise<string>((resolve,reject)=>{

    this.http.post("/fcm/notification",data,{headers:headers})
     .subscribe((resp:any)=>{

         console.log("Info del grupo ",resp);
         resolve(resp.notification_key);
  },(error)=>{
    reject(new Error("*No Existe"));
  });



  } )

}
async guardaEnBDNotiKey(notiKey:string){
  console.log("Guardando en BD");

  const grupoWebCol=doc(db, "grupoWeb","1" );
    await setDoc(grupoWebCol, {notification_key:notiKey}).catch((error)=>{
  
      console.log('Error al guardar Usuario ',error.message);
  
    });

}
  
}
