import { makeBindingParser } from '@angular/compiler';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Loader } from "@googlemaps/js-api-loader"

const url ="https://developers.google.com/maps/documentation/javascript/examples/kml/westcampus.kml";



@Component({
  selector: 'app-monitoreo',
  templateUrl: './monitoreo.page.html',
  styleUrls: ['./monitoreo.page.scss'],
})

export class MonitoreoPage implements OnInit {

public btSelectM:String="outline";
public btSelectS:String="outline";
public btSelectH:String="outline";
  constructor() { }
  

   intMap(): void {

    let map: google.maps.Map;
    map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
      center: new google.maps.LatLng(-19.257753, 146.823688),
      zoom: 2,
      mapTypeId: "terrain",
    });
   console.log('Construyendo mapa');
    const kmlLayer = new google.maps.KmlLayer({
      suppressInfoWindows: true,
      preserveViewport: false,
      map,
      url,
    });
  
    kmlLayer.addListener("click", (event) => {
      const content = event.featureData.infoWindowHtml;
      const testimonial = document.getElementById("capture") as HTMLElement;
  
      testimonial.innerHTML = content;
    });
  }
 


 /* ngAfterViewInit(): void {
    let map: google.maps.Map;
    const loader = new Loader({
      apiKey: "AIzaSyDJ6jdBlk2rzwCtW-YETggCQmPQo5vN_oc",
      version: "weekly",
      
    });
    loader.load().then(() => {
      map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8,
      });
    });
  }
*/
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

  
  }






