import { Component, ViewChild, OnInit } from '@angular/core';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MaterialModule } from 'src/app/material.module';
import { MatButtonModule } from '@angular/material/button';

import {
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexLegend,
  ApexStroke,
  ApexTooltip,
  ApexAxisChartSeries,
  ApexXAxis,
  ApexYAxis,
  ApexGrid,
  ApexPlotOptions,
  ApexFill,
  ApexMarkers,
  ApexResponsive,
  NgApexchartsModule,
} from 'ng-apexcharts';
import { SupabaseService } from 'src/app/services/supabase.service';
import { CommonModule } from '@angular/common';

export interface productsalesChart {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
  grid: ApexGrid;
  marker: ApexMarkers;
}

@Component({
  selector: 'app-product-sales',
  standalone: true,
  imports: [MaterialModule, TablerIconsModule, MatButtonModule, NgApexchartsModule, CommonModule],
  templateUrl: './product-sales.component.html',
})
export class AppProductSalesComponent implements OnInit {

  @ViewChild('chart') chart: ChartComponent = Object.create(null);

  public productsalesChart!: Partial<productsalesChart> | any;
  totalCount : number = 0;
  pageLoaded : boolean = false;


  constructor(public supabaseService : SupabaseService) {


  }

  async ngOnInit() {

    this.totalCount = await this.supabaseService.getTotalSearchesToday();

    
    this.productsalesChart = {
      series: [
        {
          name: '',
          color: '#8763da',
          data: [0],
        },
      ],

      chart: {
        type: 'area',
        fontFamily: "'Plus Jakarta Sans', sans-serif;",
        foreColor: '#adb0bb',
        toolbar: {
          show: false,
        },
        height: 60,
        sparkline: {
          enabled: true,
        },
        group: 'sparklines',
      },
      stroke: {
        curve: 'smooth',
        width: 2,
      },
      fill: {
        colors: ['#8763da'],
        type: 'solid',
        opacity: 0.05,
      },
      markers: {
        size: 0,
      },
      tooltip: {
        theme: 'dark',
        x: {
          show: false,
        },
      },
    };
    this.pageLoaded = true;
      
  }


}
