
import {  Component, OnInit } from '@angular/core';
import { MonitorService } from 'src/app/services/monitor.service';

import { Marker } from '../../interfaces/interfaces';




declare var google:any;


@Component({
  selector: 'app-monitoreo',
  templateUrl: './monitoreo.page.html',
  styleUrls: ['./monitoreo.page.scss'],
})

export class MonitoreoPage implements OnInit {
map=null;


markers: any[]=[];


public btSelectM:String="outline";
public btSelectS:String="outline";
public btSelectH:String="outline";
  constructor(private monitorSrv:MonitorService) { }
  
  ngOnInit() { 
    this.loadMap();
    this.monitorSrv.leerUbicaciones().subscribe(resp=>{

      this.limpiaMarcadores();
      let marcador;
      resp.forEach(ubicacion=>{
       
        marcador=new google.maps.Marker({
          position: new google.maps.LatLng(ubicacion.latitud,ubicacion.longitud),
          draggable: false,
          title: ubicacion.usuario,
                 map: this.map,
                
                       
          
        });
        marcador.addListener('click',function(){
          const infoWindow = new google.maps.InfoWindow();
          infoWindow.close();
          infoWindow.setContent(marcador.getTitle());
          infoWindow.open(marcador.getMap(), marcador);
        });
        
        this.markers.push(marcador);
        
        
       

      });


      if(marcador){
        this.map.setCenter(marcador.getPosition());
        this.map.setZoom(15);
      }
    });
  }

  onClickM(){
      this.btSelectM="solid";
      this.btSelectS="outline";
      this.btSelectH="outline";
      this.map.setMapTypeId('terrain');   
      }
  onClickS(){
    this.btSelectM="outline";
    this.btSelectS="solid";
    this.btSelectH="outline";  
    this.map.setMapTypeId('satellite');
  }   
  onClickH(){
    this.btSelectM="outline";
    this.btSelectS="outline";
    this.btSelectH="solid";  
    this.map.setMapTypeId('hybrid');
  }

  async loadMap(){
    const mapEle:HTMLElement = document.getElementById('map');
    const myLatLng={lat: -32.48540517655754, lng: -66.96221829130207};

    this.map= await new google.maps.Map(mapEle, {
      center: myLatLng,
      zoom: 14
    });

//https://drive.google.com/file/d/1aUAxnV5IBJoZnCLK3-qJFfUoZpsqSlpA/view?usp=sharing
  var ctaLayer = await new google.maps.KmlLayer({
      url: 'https://drive.google.com/uc?id=1aUAxnV5IBJoZnCLK3-qJFfUoZpsqSlpA',
     suppressInfoWindows: true,  
        map:this.map,
        zindex: 0,
          clickable : false
    }); 
    console.log(ctaLayer);

    ctaLayer.setMap(this.map);
    setTimeout(() => {
     // this.map.setCenter(new google.maps.LatLng(-32.48540517655754, -66.96221829130207));
     // this.map.setZoom(12);
      
}, 3000);
   
    google.maps.event.addListenerOnce(this.map,'idle',()=>{
      
      mapEle.classList.add('show-map');
     
      console.log("Hizo clic");
      
    });
       
  }

  

  limpiaMarcadores() {
    this.markers.forEach((marca)=>{
      marca.setMap(null);
       marca=null;});
    this.markers=[];
  }
 
  }






