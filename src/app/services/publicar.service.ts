import { Injectable } from '@angular/core';
import { initializeApp} from 'firebase/app';
import { firebaseConfig } from 'src/environments/environment.prod';
import { getFirestore, getDocs, collection,setDoc,doc, query, where, getDoc, deleteDoc,addDoc, DocumentData } from 'firebase/firestore/lite';
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


  async eliminarPublicacion(publicacion:Publicacion){

    await deleteDoc(doc(db, "publicacion", publicacion.identificador));

  }


  async  enviarPublicacion(publicacion:Publicacion) {

    this.publica.creador=publicacion.creador;
    this.publica.titulo=publicacion.titulo;
    this.publica.cuerpo=publicacion.cuerpo;
    this.publica.fechaCreacion=publicacion.fechaCreacion;
    this.publica.fechaVto=new Date(publicacion.fechaVto);
    this.publica.año=this.publica.fechaCreacion.getFullYear();
    this.publica.mes=this.publica.fechaCreacion.getMonth()+1;
    this.publica.dia=this.publica.fechaCreacion.getDate();

    

    console.log('Guardando');
  
    
    // De esta forma guarda un documento cuyo id es random
    
    if(publicacion.identificador.length>0){
      const col=doc(db,"publicacion",publicacion.identificador);
     await setDoc(col,this.publica).catch((error)=>{
  
      console.log('Error al guardar Usuario ',error.message);
  
    });
  }else{
    const col=collection(db,"publicacion");
      await addDoc(col,this.publica).catch((error)=>{
   
       console.log('Error al guardar Usuario ',error.message);
   
     });


  }
  
}

  async obtenerPublicaciones(fecha:Date){
   
    const col=collection(db,"publicacion");
    
    const q=query(col,where('mes','==',fecha.getMonth()+1),where('año','==',fecha.getFullYear()),where('dia','==',fecha.getDate()));
    const publicacionesSnapshot = await getDocs(q);
    const publiList:DocumentData[] = publicacionesSnapshot.docs.map((doc) => {
      console.log("Documento ",doc.data());
      doc.data().identificador=doc.id;
      let publicaM:Publicacion={
        identificador:doc.id,
    titulo:doc.data().titulo,
    cuerpo:doc.data().cuerpo,
    urlImagen:doc.data().urlImagen,
    fechaCreacion:doc.data().fechaCreacion, 
    fechaVto: doc.data().fechaVto,
    creador:doc.data().creador,
    año:doc.data().año,
    mes:doc.data().mes,
    dia:doc.data().dia,
    vence:doc.data().vence
      }
      return publicaM;});
    const listaPublicaciones:Publicacion[]=[];
    publiList.forEach((publi)=>{
      console.log("Salida ID ",publi);
      publi.fechaCreacion=publi.fechaCreacion.toDate();
      publi.fechaVto=publi.fechaVto.toDate();
      publi.vence=publi.dia+"/"+publi.mes+"/"+publi.año;
      listaPublicaciones.push(publi as Publicacion);
    });

  

    console.log("Fecha ",fecha.getFullYear(),fecha.getMonth()+1,fecha.getDate());
    console.log(publiList);
    return listaPublicaciones;
   

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


