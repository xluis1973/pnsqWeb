import { Injectable } from '@angular/core';
import { getFirestore, getDocs, collection,setDoc,doc, query, where, getDoc, addDoc, deleteDoc, orderBy, onSnapshot } from 'firebase/firestore';
import { initializeApp} from 'firebase/app';
import { Ubicacion } from '../interfaces/interfaces';
import { firebaseConfig } from 'src/environments/environment.prod';
import { Observable } from 'rxjs';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';



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
    const hoyy:Date=new Date();
    let fechaActual:Date=new Date(hoyy.getFullYear(),hoyy.getMonth(),hoyy.getDate());
    console.log("Fecha en string ",fechaActual);
  
   // const q = query(ubicacionCol,where("fechaHora",">=",fechaActual));
   const q=query(ubicacionCol,where("identificador","!=",".."));
    const ubicacionSnapshot =onSnapshot(q,algo=>{

      algo.docChanges().forEach(ubi=>{

        if (ubi.type === "added") {
         
                console.log("add");
                this.listaUbicaciones.push(ubi.doc.data() as Ubicacion);
                observe.next(this.listaUbicaciones);


              
            
            
         
      }
      if (ubi.type === "modified") {
       
        console.log("modified");
        const indice=this.buscarElemento(ubi.doc.data().usuario);
        if(indice!=-1){

          console.log("Hubo cambios");

              
                this.listaUbicaciones[indice]=ubi.doc.data() as Ubicacion;
                observe.next(this.listaUbicaciones);
              

              

        }
        
     
  } 
    if(ubi.type === "removed"){
      console.log("Cambios en removido ",ubi.doc.data());
      const indice=this.buscarElemento(ubi.doc.data().usuario);
      if(indice!=-1){
       

       this.listaUbicaciones=this.listaUbicaciones.filter(elem=>elem.usuario!=ubi.doc.data().usuario);
     
       console.log("Después de borrar",this.listaUbicaciones);
       observe.next(this.listaUbicaciones);

  }else {
    this.listaUbicaciones=[];
    observe.next(this.listaUbicaciones);
  }

    }
       
  
  
      });


  },(error) => {
    //...
    console.log("Se cerró la sesión- Cierro el Listener");
  });

  
 
});

leerUbicaciones(){
  return this.observaUbicaciones;
}

buscarElemento(buscar:string):number{
  let indice:number=-1;

    indice=this.listaUbicaciones.findIndex((elemento)=>elemento.usuario===buscar);
 console.log("El indice es ",indice);
return indice;

}
}
