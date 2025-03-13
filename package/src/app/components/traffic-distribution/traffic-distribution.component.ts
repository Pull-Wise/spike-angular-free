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

export interface trafficdistributionChart {
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
  selector: 'app-traffic-distribution',
  standalone: true,
  imports: [MaterialModule, TablerIconsModule, MatButtonModule, NgApexchartsModule],
  templateUrl: './traffic-distribution.component.html',
})
export class AppTrafficDistributionComponent implements OnInit{

  @ViewChild('chart') chart: ChartComponent = Object.create(null);

  public trafficdistributionChart!: Partial<trafficdistributionChart> | any;
  searchCount : any = [];
  percentageDifference : any;


  constructor(public supabaseService : SupabaseService) {

    this.trafficdistributionChart = {
      series: [ 0, 4106],
      labels: [ 'Refferal Traffic', 'Oragnic Traffic'],
      chart: {
        type: 'donut',
        fontFamily: "'Plus Jakarta Sans', sans-serif;",
        foreColor: '#adb0bb',
        toolbar: {
          show: false,
        },
        height: 160,
      },
      colors: ['#fb977d','#0085db'],
      plotOptions: {
        pie: {
          donut: {
            size: '80%',
            background: 'none',
            labels: {
              show: true,
              name: {
                show: true,
                fontSize: '12px',
                color: undefined,
                offsetY: 5,
              },
              value: {
                show: false,
                color: '#98aab4',
              },
            },
          },
        },
      },
      stroke: {
        show: false,
      },
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: false,
      },
      responsive: [
        {
          breakpoint: 991,
          options: {
            chart: {
              width: 120,
            },
          },
        },
      ],
      tooltip: {
        enabled: false,
      },
    };

  }

  async ngOnInit() {
    let userId = sessionStorage.getItem('user_id') ?? '';
     this.searchCount = await this.supabaseService.getTodaysSearchData(userId) ;
     this.percentageDifference = await this.supabaseService.getSearchPercentageChange(userId);
  }

}
