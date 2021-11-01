import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
  public btSelectN:String="outline";
  public btSelectE:String="outline";
  public btSelectD:String="outline";
  public btSelectB:String="outline";

  constructor() { }

  ngOnInit() {
  }

  //Nuevo
  onClickN(){
    this.btSelectN="solid";
    this.btSelectE="outline";
    this.btSelectD="outline";   
    this.btSelectB="outline";   
    }
    //Editar
onClickE(){
  this.btSelectN="outline";
  this.btSelectE="solid";
  this.btSelectD="outline";   
  this.btSelectB="outline";  
}   
//Borrar
onClickD(){
  this.btSelectN="outline";
  this.btSelectE="outline";
  this.btSelectD="solid";   
  this.btSelectB="outline";  
}
//Buscar
onClickB(){
  this.btSelectN="outline";
  this.btSelectE="outline";
  this.btSelectD="outline";   
  this.btSelectB="solid";  
}

crearUsuario(){
  /*const auth = getAuth();
     //Para crear un nuevo usuario.
     createUserWithEmailAndPassword(auth, "javy@mercado.com", "12345678")
       .then((userCredential) => {
         // Signed in
         const user = userCredential.user;
         console.log('Exitoso ');
         console.log(user);
         // ...
       })
       .catch((error) => {
         const errorCode = error.code;
         const errorMessage = error.message;
         console.log('Error ');
         // ..
       });*/
}

}
