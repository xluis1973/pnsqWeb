import { Injectable } from '@angular/core';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut  } from "firebase/auth";
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from 'src/environments/environment.prod';
import { getFirestore, collection, getDocs, setDoc,orderBy,query,where } from 'firebase/firestore/lite';
import { Grupo } from '../interfaces/interfaces';
import { group } from 'console';


const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);
@Injectable({
  providedIn: 'root'
})
export class ReporteService {

  constructor() { }
  
  async senderosVisitados(porMes?:boolean){

    let flora:number=0;
    let mirador:number=0;
    let guanacos:number=0;
    let huellas:number=0;
    let farallones:number=0;
    const grup:Grupo={
      identificador:'',
      fechaCreacion:new Date(),
      recorrido:'',
      guiaResponsable:'',
      visitantes:[],
      activo:true
    };
  const grupoCol = collection(db, 'grupo');

  const q = query(grupoCol,orderBy("recorrido","asc"));
  const grupoSnapshot = await getDocs(q);
  
  const grupoList = grupoSnapshot.docs.map(doc => doc.data());
  if(porMes){

    grupoList.forEach((grupo)=>{

  
      grupo.fechaCreacion=grupo.fechaCreacion.toDate();
      
      if(grupo.fechaCreacion.getUTCMonth() == new Date().getUTCMonth() && grupo.fechaCreacion.getFullYear()== new Date().getFullYear() ){
       
        
       switch(grupo.recorrido){
  
        case "flora":flora++; break;
        case "mirador":mirador++;break;
        case "guanacos":guanacos++;break;
        case "huellas":huellas++;break;
        case "farallones":farallones++;break;
  
      }
  
    }else {
      console.log("No ",grupo.fechaCreacion.getUTCMonth());
    }
  
  
    });
  


  }
 
  let total:number=flora+mirador+guanacos+huellas+farallones;
  if(total>0){
  flora=flora*100/total;
  mirador=mirador*100/total;
  guanacos=guanacos*100/total;
  huellas=huellas*100/total;
  farallones=farallones*100/total;
  console.log("flora ",flora);
  console.log("mirador ",mirador);
  console.log("guanacos ",guanacos);
  console.log("huellas ",huellas);
  console.log("farallones ",farallones);

  return [flora,guanacos,mirador,farallones,huellas];
  } else {

    return [0,0,0,0,0];
  }
 

  

  }
}