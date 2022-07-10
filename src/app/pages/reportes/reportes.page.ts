import { Component, OnInit ,AfterViewInit, ElementRef, ViewChild} from '@angular/core';

import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';

import { Label } from 'ng2-charts';
import { ReporteService } from '../../services/reporte.service';






@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.page.html',
  styleUrls: ['./reportes.page.scss'],
  
})
export class ReportesPage {

  
  public btSelectM:String="solid";
  public btSelectS:String="outline";
  public btSelectH:String="outline";
  private año:boolean=true;
  private mes:boolean=false;
  private hoy:boolean=false;
  public tituloVisitantes:string="Visitantes "+new Date().getFullYear();
  constructor(private reporteSrv:ReporteService) { this.cargaDatos();}

  ionViewWillEnter() {
    this.cargaDatos();
 }

  onClickM(){
    this.btSelectM="solid";
    this.btSelectS="outline";
    this.btSelectH="outline";
    this.año=true;
    this.mes=false;
    this.hoy=false;
    this.cargaDatos();
    

      
    }
onClickS(){
  this.btSelectM="outline";
  this.btSelectS="solid";
  this.btSelectH="outline";  
  this.año=false;
  this.mes=true;
  this.hoy=false;
  this.cargaDatos();
}   
onClickH(){
  this.btSelectM="outline";
  this.btSelectS="outline";
  this.btSelectH="solid";  
  this.año=false;
  this.mes=false;
  this.hoy=true;
  this.cargaDatos();
}

private senderosVisitados:number[]=[0,0,0,0,0];
private visitantes:number[]=[0,0];

//Gráfico de Barras
  //Aquí leería de un servicio
  public barChartLabels = ['Visitantes'];
  public barChartType = 'bar' as ChartType;
  
  public barChartPlugins =null;

  public barChartData = [
    { data: [65], label: 'Visitantes sin Guía' },
    { data: [28], label: 'Visitantes con Guía' }
  ];

  barChartOptions = { legend: { display: true, labels: { fontColor: 'black' } }};
 

  //Gráfico circular
  //Aquí leería desde un servicio
  public tartaChartLabels = ['Flora', 'Guanacos', 'Miradores', 'Farallones', 'Huellas'];
  public tartaChartType = 'pie' as ChartType;
  
  public tartaChartPlugins =null;

  valores:number[];
  
  public tartaChartData = [
    { data: this.senderosVisitados, label: 'Senderos' },
   
  ];

  tartaChartOptions = { legend: { display: true, labels: { fontColor: 'black' } }};
 

  
  async cargaDatos(){

    this.senderosVisitados= await this.reporteSrv.senderosVisitados(this.año,this.mes,this.hoy);
    this.tartaChartData = [
      { data: this.senderosVisitados, label: 'Senderos' },
     
    ];

   this.visitantes = await this.reporteSrv.informeVisitantes();
    this.barChartData = [
      { data: [this.visitantes[1]], label: 'Visitantes sin Guía' },
      { data: [this.visitantes[0]], label: 'Visitantes con Guía' }
    ];
    
  }

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public randomize(): void {
    // Only Change 3 values
    this.barChartData[0].data = [
      Math.round(Math.random() * 100),
      59,
      80,
      (Math.random() * 100),
      56,
      (Math.random() * 100),
      40 ];
  }

}
