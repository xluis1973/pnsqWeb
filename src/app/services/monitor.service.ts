import { Injectable } from '@angular/core';
import { getFirestore, getDocs, collection,setDoc,doc, query, where, getDoc, addDoc, deleteDoc, orderBy, onSnapshot } from 'firebase/firestore';
import { initializeApp} from 'firebase/app';
import { Ubicacion } from '../interfaces/interfaces';
import { firebaseConfig } from 'src/environments/environment.prod';
import { Observable } from 'rxjs';



const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


@Injectable({
  providedIn: 'root'
})
export class MonitorService {

  constructor() { }

  private listaUbicaciones:Ubicacion[]=[];


  private observaUbicaciones=new Observable<Ubicacion[]>(observe=>{

    const ubicacionCol = collection(db, 'ubicacion');
  
    const q = query(ubicacionCol);
    const ubicacionSnapshot =onSnapshot(q,algo=>{

      algo.docChanges().forEach(ubi=>{

        if (ubi.type === "added") {
         

            this.listaUbicaciones.push(ubi.doc.data() as Ubicacion);
            observe.next(this.listaUbicaciones);
            
         
      }
      if (ubi.type === "modified") {
         

        const indice=this.buscarElemento(ubi.doc.data().usuario);
        if(indice!=-1){

              this.listaUbicaciones[indice]=ubi.doc.data() as Ubicacion;
              observe.next(this.listaUbicaciones);

        }
        
     
  } 
    if(ubi.type === "removed"){

      const indice=this.buscarElemento(ubi.doc.data().usuario);
      if(indice!=-1){

       this.listaUbicaciones.slice(indice,1);
       observe.next(this.listaUbicaciones);

  }

    }
       
  
  
      });


  });

 
});

leerUbicaciones(){
  return this.observaUbicaciones;
}

buscarElemento(buscar:string):number{
  let indice:number=-1;

    indice=this.listaUbicaciones.findIndex((elemento,indice)=>{

    if(elemento.usuario===buscar){
      return true;
    }

  })

  return indice;
}


}

