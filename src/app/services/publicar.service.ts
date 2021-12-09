import { Injectable } from '@angular/core';
import { initializeApp} from 'firebase/app';
import { firebaseConfig } from 'src/environments/environment.prod';
import { getFirestore, getDocs, collection,setDoc,doc, query, where, getDoc, addDoc } from 'firebase/firestore/lite';
import { Publicacion } from '../interfaces/interfaces';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from '@firebase/storage';

//import {getMessaging,onMessage} from 'firebase/messaging' 
import {getMessaging} from 'firebase/messaging/sw';



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


  constructor() { }


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

 const topic = 'highScores';

const message = {
  data: {
    score: '850',
    time: '2:45'
  },
  topic: topic
};

// Send a message to devices subscribed to the provided topic.

getMessaging().send(message)
  .then((response) => {
    // Response is a message ID string.
    console.log('Successfully sent message:', response);
  })
  .catch((error) => {
    console.log('Error sending message:', error);
  });
 
}
}


