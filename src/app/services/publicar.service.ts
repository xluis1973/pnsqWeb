import { Injectable } from '@angular/core';
import { initializeApp} from 'firebase/app';
import { firebaseConfig } from 'src/environments/environment.prod';
import { getFirestore, getDocs, collection,setDoc,doc, query, where, getDoc, addDoc } from 'firebase/firestore/lite';
import { Publicacion } from '../interfaces/interfaces';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from '@firebase/storage';
import { HttpClient, HttpHeaders } from '@angular/common/http';





const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const almacen = getStorage(app);


@Injectable({
  providedIn: 'root'
})
export class PublicarService {
  
  private publica:Publicacion={
    identificador:"",
  titulo:"",
  cuerpo:"",
  urlImagen:"",
  fechaCreacion:null, 
  fechaVto: null,
  creador:""

  };


  constructor(private http:HttpClient) { }


  async  enviarPublicacion(publicacion:Publicacion) {

    this.publica.creador=publicacion.creador;
    this.publica.titulo=publicacion.titulo;
    this.publica.cuerpo=publicacion.cuerpo;
    this.publica.fechaCreacion=publicacion.fechaCreacion;
    this.publica.fechaVto=publicacion.fechaVto;
    

    console.log('Guardando');
  
    
    // De esta forma guarda un documento cuyo id es random
    const col=collection(db,"publicacion");
    
    await addDoc(col,this.publica).catch((error)=>{
  
      console.log('Error al guardar Usuario ',error.message);
  
    });

  
    
}

 async guardarImage(file){
      const id=Math.random().toString(32).substring(2);
      const filePath=`upload/img${id}`;
      const refe =ref(almacen,filePath);
      const task=uploadBytesResumable(refe,file);
      task.on('state_changed', function(snapshot){
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          default:{
            console.log("Estado "+snapshot.state);
          }
        }
      }, (error) =>{
        // Handle unsuccessful uploads
      }, () =>{
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
       getDownloadURL(refe).then(res=>{
         console.log("URL "+res);
         this.publica.urlImagen=res;
         
       });
      });    
      await task;
     
}

notificacionesPush(){

const data ={
  notification:{
    title:'Notification title Todos topic',
    body: 'Notification body Todos topic',
    sound: 'default',
    click_action: 'FCM_PLUGIN_ACTIVITY', 
    icon: 'fcm_push_icon'
  },
  to: '/topics/topicExample',
  priority: 'high'
}

// Send a message to devices subscribed to the provided topic.

const headers= new HttpHeaders({
  'Content-Type': 'application/json',
  'Authorization':'key=AAAAaLWopaA:APA91bHC-ubI9ojxhcL-t-sudGv9EmX9bz7-RyGQ0J47_pVtjQO4ATRrNpoO3UYUwqOMbPjc5ZDupMfH5gqIFK_BBL6nMD48q_nqUvjwonRAyre0gy9i_b2jk9eakDF4_Uc2_4Wz23vd'

});

//const headers = new HttpHeaders().set('Content-Type', 'application/json');
//headers.set('Authorization','Bearer AAAAaLWopaA:APA91bHC-ubI9ojxhcL-t-sudGv9EmX9bz7-RyGQ0J47_pVtjQO4ATRrNpoO3UYUwqOMbPjc5ZDupMfH5gqIFK_BBL6nMD48q_nqUvjwonRAyre0gy9i_b2jk9eakDF4_Uc2_4Wz23vd');

this.http.post("https://fcm.googleapis.com/fcm/send",data,{headers:headers,responseType:"text"})
.subscribe(resp=>{
          console.log("Respuesta de envio ",resp);
});

}
}


