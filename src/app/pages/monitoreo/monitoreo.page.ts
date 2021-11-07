
import {  Component, OnInit } from '@angular/core';


const url ="https://developers.google.com/maps/documentation/javascript/examples/kml/westcampus.kml";

declare var google;


@Component({
  selector: 'app-monitoreo',
  templateUrl: './monitoreo.page.html',
  styleUrls: ['./monitoreo.page.scss'],
})

export class MonitoreoPage implements OnInit {
map=null;
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
      }
  onClickS(){
    this.btSelectM="outline";
    this.btSelectS="solid";
    this.btSelectH="outline";  
  }   
  onClickH(){
    this.btSelectM="outline";
    this.btSelectS="outline";
    this.btSelectH="solid";  
  }

  loadMap(){
    const mapEle:HTMLElement = document.getElementById('map');
    const myLatLng={lat: -33.1807797, lng: -66.3179661};

    this.map=new google.maps.Map(mapEle, {
      center: myLatLng,
      zoom: 12
    });

    google.maps.event.addListenerOnce(this.map,'idle',()=>{
      
      mapEle.classList.add('show-map');
    });

    
  }
  
  }






