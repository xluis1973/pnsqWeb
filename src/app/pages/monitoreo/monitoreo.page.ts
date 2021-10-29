import { makeBindingParser } from '@angular/compiler';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

declare var mapboxgl:any;

@Component({
  selector: 'app-monitoreo',
  templateUrl: './monitoreo.page.html',
  styleUrls: ['./monitoreo.page.scss'],
})

export class MonitoreoPage implements OnInit, AfterViewInit {
  @ViewChild('mapa',{static:true}) mapa;
public btSelectM:String="outline";
public btSelectS:String="outline";
public btSelectH:String="outline";
  constructor() { }

  ngOnInit() { }

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
ngAfterViewInit(): void {
  
mapboxgl.accessToken = 'pk.eyJ1IjoibHVpczE5NzMiLCJhIjoiY2tsMWg2OTV6MDMyMjMybXJlcXhyOTY1MyJ9.YN_7kOCUnfTsbUbInFTUgQ';
const map = new mapboxgl.Map({
container: 'map', // container ID
style: 'mapbox://styles/mapbox/streets-v11', // style URL
center: [-74.5, 40], // starting position
zoom: 9 // starting zoom
});
 
map.on('load', () => {
  map.resize();
  // Insert the layer beneath any symbol layer.
    const layers = map.getStyle().layers;
    const labelLayerId = layers.find((layer) => 
                    layer.type === 'symbol' && layer.layout['text-field']).id;
    
// Add zoom and rotation controls to the map.
    map.addControl(new mapboxgl.NavigationControl());
 

  }


);}

}


