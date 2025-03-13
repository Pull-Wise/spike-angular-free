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


interface month {
  value: string;
  viewValue: string;
}

export interface profitExpanceChart {
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
  selector: 'app-profit-expenses',
  standalone: true,
  imports: [MaterialModule, TablerIconsModule, MatButtonModule, NgApexchartsModule, CommonModule],
  templateUrl: './profit-expenses.component.html',
})
export class AppProfitExpensesComponent implements OnInit {

  @ViewChild('chart') chart: ChartComponent = Object.create(null);

  public profitExpanceChart!: Partial<profitExpanceChart> | any;

  months: month[] = [
    { value: 'mar', viewValue: 'Sep 2024' },
    { value: 'apr', viewValue: 'Oct 2024' },
    { value: 'june', viewValue: 'Nov 2024' },
  ];

  lastSevenDays : string[] = [];
  lastSevenDaysSearchData  = [];
  isChartLoaded : boolean = false;


  constructor(public supabaseService : SupabaseService) {


  }

  async ngOnInit(){
      
    this.lastSevenDaysSearchData = await this.getDataForPastSevenDays();
    this.lastSevenDays = this.getPast7Days();

    let count = this.lastSevenDaysSearchData.map((data : any) => data.count)
    while (count.length < 7) {
      count.push(0);
  }
    count = count.reverse();    

    // sales overview chart
    this.profitExpanceChart = {
      series: [
        {
          name: 'Search Appearences',
          data: count,
          color: '#0085db',
        },
        // {
        //   name: 'Expense this month',
        //   data: [6, 3, 9, 5, 4, 6, 4],
        //   color: '#fb977d',
        // },
      ],

      grid: {
        borderColor: 'rgba(0,0,0,0.1)',
        strokeDashArray: 3,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '30%',
          borderRadius: 4,
          endingShape: "rounded",
        },
      },
      chart: {
        type: 'bar',
        height: 390,
        offsetY: 10,
        foreColor: '#adb0bb',
        fontFamily: 'inherit',
        toolbar: { show: false },
      },
      dataLabels: { enabled: false },
      markers: { size: 0 },
      legend: { show: false },
      xaxis: {
        type: 'category',
        categories: this.lastSevenDays,
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        labels: {
          style: { cssClass: 'grey--text lighten-2--text fill-color' },
        },
      },
      stroke: {
        show: true,
        width: 5,
        colors: ['transparent'],
      },
      tooltip: { theme: 'light' },

      responsive: [
        {
          breakpoint: 600,
          options: {
            plotOptions: {
              bar: {
                borderRadius: 3,
              },
            },
          },
        },
      ],
    };

    this.isChartLoaded = true;
  }

  getPast7Days(): string[] {
    const dates: string[] = [];
    const today = new Date();

    for (let i = 0; i < 7; i++) {
        const pastDate = new Date();
        pastDate.setDate(today.getDate() - i);
        dates.push(`${pastDate.getDate()}/${pastDate.getMonth() + 1}`);
    }

    return dates.reverse(); // Reverse to maintain ascending order
  }

  

  async getDataForPastSevenDays(){
    let userId = sessionStorage.getItem('user_id') ?? '';
    let data = await this.supabaseService.getSearchDataForPastSevenDays(userId);
    return data;
  }




}
