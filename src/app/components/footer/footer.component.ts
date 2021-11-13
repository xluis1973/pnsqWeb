import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  @Input() indice:any;

  seleccion1:any="false";
  seleccion2:any="false";
  seleccion3:any="false";
  seleccion4:any="false";
  seleccion5:any="false";
  constructor() { }

  ngOnInit() {
    if(this.indice=="1"){

      this.seleccion1="true";
      this.seleccion2="false";
      this.seleccion3="false";
      this.seleccion4="false";
      this.seleccion5="false";
    }else if(this.indice=="2"){
      this.seleccion1="false";
      this.seleccion2="true";
      this.seleccion3="false";
      this.seleccion4="false";
      this.seleccion5="false";

    
  }else if(this.indice=="3"){
    this.seleccion1="false";
    this.seleccion2="false";
    this.seleccion3="true";
    this.seleccion4="false";
    this.seleccion5="false";

  }else if(this.indice=="4"){
    this.seleccion1="false";
    this.seleccion2="false";
    this.seleccion3="false";
    this.seleccion4="true";
    this.seleccion5="false";

  }else if(this.indice=="5"){
    this.seleccion1="false";
    this.seleccion2="false";
    this.seleccion3="false";
    this.seleccion4="false";
    this.seleccion5="true";

  }


  }

}
