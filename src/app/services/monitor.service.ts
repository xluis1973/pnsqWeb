import { Injectable } from '@angular/core';
import { getFirestore, getDocs, collection,setDoc,doc, query, where, getDoc, addDoc, deleteDoc, orderBy, onSnapshot } from 'firebase/firestore';
import { initializeApp} from 'firebase/app';
import { Ubicacion } from '../interfaces/interfaces';
import { firebaseConfig } from 'src/environments/environment.prod';


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


@Injectable({
  providedIn: 'root'
})
export class MonitorService {

  constructor() { }



  async obtenerUbicaciones():Promise<Ubicacion[]>{
    let ubicaciones:Ubicacion[]=[];
    const ubicacionCol = collection(db, 'ubicacion');
  
    const q = query(ubicacionCol);
    const ubicacionSnapshot =onSnapshot(q,algo=>{

      algo.docChanges().forEach(ubi=>{

        if (ubi.type === "added") {
         

            console.log("Nueva ubicacion ",ubi.doc.data().latitud);
            
         
      }
      if (ubi.type === "modified") {
         

        console.log("Modifica ubicacion ",ubi.doc.data().latitud);
        
     
  }
       
  
  
      });

    })
    
    
    /*const ubicacionList = ubicacionSnapshot.docs.map(doc => doc.data());
    if(ubicacionList){
      ubicacionList.forEach(ubi=>{


        ubicaciones.push(ubi as Ubicacion);
        console.log("mensaje ",ubi);


      });
    }*/
    return ubicaciones;
  
   }
}
