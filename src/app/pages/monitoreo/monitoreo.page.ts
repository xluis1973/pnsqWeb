
import {  Component, OnInit } from '@angular/core';

import { Marker } from '../../interfaces/interfaces';


const url ="https://developers.google.com/maps/documentation/javascript/examples/kml/westcampus.kml";

declare var google;


@Component({
  selector: 'app-monitoreo',
  templateUrl: './monitoreo.page.html',
  styleUrls: ['./monitoreo.page.scss'],
})

export class MonitoreoPage implements OnInit {
map=null;
markers: Marker[]=[

  {
    position: {
      lat: -33.1742696,
      lng: -66.2954034
    },
    title: 'visitante 1'
  },

  {
    position: {
      lat: -33.1740215,
      lng: -66.2975196
    },
    title: 'visitante 2'
  },
  {
    position: {
      lat: -33.1742500,
      lng: -66.2954034
    },
    title: 'visitante 3'
  },
  {
    position: {
      lat: -33.1742400,
      lng: -66.2954034
    },
    title: 'visitante 4'
  }

];


public btSelectM:String="outline";
public btSelectS:String="outline";
public btSelectH:String="outline";
  constructor() { }
  
  ngOnInit() { 
    this.loadMap();
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
      zoom: 50
    });


  var ctaLayer = new google.maps.KmlLayer({
      url: 'https://drive.google.com/uc?id=1aUAxnV5IBJoZnCLK3-qJFfUoZpsqSlpA',
     suppressInfoWindows: true,  
        map:this.map,
        zindex: 0,
          clickable : false
    }); 

    setTimeout(() => {
      this.map.setCenter(new google.maps.LatLng(-32.48540517655754, -66.96221829130207));
      this.map.setZoom(12);
      
}, 3000);
   
    google.maps.event.addListenerOnce(this.map,'idle',()=>{
      
      mapEle.classList.add('show-map');
      this.renderMarkets();
    });
       
  }

  renderMarkets(){
    this.markers.forEach(marker=>{
    
      this.addMarker(marker);
      
    });
  }
//agregar marcador
  addMarker(marker:Marker){
    return new google.maps.Marker({
      position: marker.position,
      map: this.map,
      title: marker.title
    });
  }
  
 
  }






