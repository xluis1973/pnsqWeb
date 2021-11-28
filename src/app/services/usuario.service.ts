import { PropertyRead } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword  } from "firebase/auth";
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from 'src/environments/environment.prod';
import { getFirestore, collection, getDocs, setDoc,doc } from 'firebase/firestore/lite';
import { Guia, Usuario } from '../interfaces/interfaces';

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario:Usuario;
  guia:Guia;
  constructor() { }

 async login(email:string,password:string):Promise<boolean>{

          
  return new Promise(resolve=>{

    signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            resolve(true);
            // ...
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            resolve(false);
          });


  });

   

}

async crearUsuario(usuario:Usuario,guia:Guia):Promise<boolean>{

this.usuario=usuario;
this.guia=guia;
return new Promise(resolve=>{
     //Para crear un nuevo usuario.
     createUserWithEmailAndPassword(auth, guia.email, guia.password)
       .then((userCredential) => {
         // Signed in
         const user = userCredential.user;
         this.usuario.identificador=user.uid;
         this.guia.usuario=user.uid;
         
         resolve(true);

         // ...
       })
       .catch((error) => {
         const errorCode = error.code;
         const errorMessage = error.message;
         console.log('error ',errorMessage);
         resolve(false);
         // ..
       });

      });

}
//Guarda datos en DB
async  guardarDatos() {

  console.log('Guardando');

  const usuarioCol=doc(db, "usuario", this.usuario.identificador );
  await setDoc(usuarioCol, this.usuario).catch((error)=>{

    console.log('Error al guardar ',error.message);

  });


  /*const usuarioCol = collection(db, 'usuario');

  
  const usuarioSnapshot = await getDocs(usuarioCol);
  const usuarioList = usuarioSnapshot.docs.map(doc => doc.data());
  return usuarioList;*/
}
}