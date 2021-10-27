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

  ngOnInit() {
    
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
ngAfterViewInit(): void {
  
  /*mapboxgl.accessToken = 'pk.eyJ1IjoibHVpczE5NzMiLCJhIjoiY2tsMWg2OTV6MDMyMjMybXJlcXhyOTY1MyJ9.YN_7kOCUnfTsbUbInFTUgQ';
  const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11'
 });
*/

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
    const labelLayerId = layers.find(
    (layer) => layer.type === 'symbol' && layer.layout['text-field']
  ).id;
// Add zoom and rotation controls to the map.
map.addControl(new mapboxgl.NavigationControl());

 console.log('Cargando');
/*

 const map = new mapboxgl.Map({
  style: 'mapbox://styles/mapbox/light-v10',
  center: [-66.31252659628312,-33.18440094418022],
  zoom: 15.5,
  pitch: 45,
  bearing: -17.6,
  container: 'map',
  antialias: true
  });

  map.on('load', () => {
    map.resize();
    // Insert the layer beneath any symbol layer.
      const layers = map.getStyle().layers;
      const labelLayerId = layers.find(
      (layer) => layer.type === 'symbol' && layer.layout['text-field']
    ).id;
     
    // The 'building' layer in the Mapbox Streets
    // vector tileset contains building height data
    // from OpenStreetMap.
    map.addLayer(
    {
      'id': 'add-3d-buildings',
      'source': 'composite',
      'source-layer': 'building',
      'filter': ['==', 'extrude', 'true'],
      'type': 'fill-extrusion',
      'minzoom': 15,
      'paint': {
      'fill-extrusion-color': '#aaa',
     
    // Use an 'interpolate' expression to
    // add a smooth transition effect to
    // the buildings as the user zooms in.
      'fill-extrusion-height': [
      'interpolate',
      ['linear'],
      ['zoom'],
        15,
        0,
        15.05,
    ['get', 'height']
    ],
    'fill-extrusion-base': [
    'interpolate',
    ['linear'],
    ['zoom'],
    15,
    0,
    15.05,
    ['get', 'min_height']
    ],
    'fill-extrusion-opacity': 0.6
    }
    },
    labelLayerId
    );
    });

    const marker = new mapboxgl.Marker()
    .setLngLat([-66.3122395, -33.1843936])
    .setPopup(new mapboxgl.Popup().setHTML("<h1>Inmobiliaria La Punta</h1>"))
    .addTo(map);

*/


}

}
