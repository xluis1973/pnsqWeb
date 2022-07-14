
import {  Component, OnDestroy, OnInit } from '@angular/core';
import { MonitorService } from 'src/app/services/monitor.service';






declare var google:any;


@Component({
  selector: 'app-monitoreo',
  templateUrl: './monitoreo.page.html',
  styleUrls: ['./monitoreo.page.scss'],
})

export class MonitoreoPage implements OnInit, OnDestroy {
map=null;


markers: any[]=[];
 marcador:any;

public btSelectM:String="outline";
public btSelectS:String="outline";
public btSelectH:String="outline";
  constructor(private monitorSrv:MonitorService) { }
  
  ngOnInit() { 
  
      this.loadMap();
    
    
    this.monitorSrv.leerUbicaciones().subscribe(resp=>{

      this.limpiaMarcadores();
   
      resp.forEach(ubicacion=>{
       
        this.marcador=new google.maps.Marker({
          position: new google.maps.LatLng(ubicacion.latitud,ubicacion.longitud),
          draggable: false,
          title: ubicacion.identificador,
                 map: this.map,
                
                       
          
        });
        this.marcador.addListener('click',function(){
          const infoWindow = new google.maps.InfoWindow();
          infoWindow.close();
          infoWindow.setContent(this.marcador.getTitle());
          infoWindow.open(this.marcador.getMap(), this.marcador);
        });
        console.log("Marcador agregado ",this.marcador);
        this.markers.push(this.marcador);
        
        
       

      });


      if(this.marcador){
        this.map.setCenter(this.marcador.getPosition());
        this.map.setZoom(17);
       
      }
    });
  }
  ngOnDestroy() {
    
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
      zoom: 17
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
      if(this.marcador){
      this.map.setCenter(this.marcador.getPosition());
      this.map.setZoom(17);
      }
      
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






