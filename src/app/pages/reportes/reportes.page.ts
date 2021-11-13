import { Component, OnInit ,AfterViewInit, ElementRef, ViewChild} from '@angular/core';

import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';

import { Label } from 'ng2-charts';






@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.page.html',
  styleUrls: ['./reportes.page.scss'],
  
})
export class ReportesPage implements OnInit {

  btSelectM="solid";
  //Gráfico de Barras
  //Aquí leería de un servicio
  public barChartLabels = ['Abril', 'Mayo', 'Junio', 'Agosto', 'Septiembre', 'Octubre'];
  public barChartType = 'bar';
  
  public barChartPlugins =null;

  public barChartData = [
    { data: [65, 59, 80, 81, 56, 55], label: 'Visitantes sin Guía' },
    { data: [28, 48, 40, 19, 86, 27], label: 'Visitantes con Guía' }
  ];

  barChartOptions = { legend: { display: true, labels: { fontColor: 'black' } }};
  constructor() { }

  //Gráfico circular
  //Aquí leería desde un servicio
  public tartaChartLabels = ['Flora', 'Guanacos', 'Miradores', 'Farallones', 'Huellas'];
  public tartaChartType = 'pie';
  
  public tartaChartPlugins =null;

  public tartaChartData = [
    { data: [45,25 , 15, 5, 10], label: 'Senderos' },
   
  ];

  tartaChartOptions = { legend: { display: true, labels: { fontColor: 'black' } }};
 

  ngOnInit(): void {
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
