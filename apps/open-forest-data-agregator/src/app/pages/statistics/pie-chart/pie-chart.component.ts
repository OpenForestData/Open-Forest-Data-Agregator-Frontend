import { Component, OnInit } from '@angular/core';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label } from 'ng2-charts';
import { ChartOptions, ChartType } from 'chart.js';

@Component({
  selector: 'ofd-agregator-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit {
  public pieChartOptions: ChartOptions = {
    responsive: true,
    tooltips: {
      enabled: true,
      callbacks: {
        label: tooltipItem => {
          return `${this.pieChartLabels[tooltipItem.index]}: ${this.pieChartData[tooltipItem.index]}`;
        },
        title: () => null
      }
    },
    legend: {
      position: 'bottom',
      display: true
    },
    plugins: {
      datalabels: {
        display: false,
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        }
      }
    }
  };
  public pieChartLabels: Label[] = [
    'Koktajl truskawkowy',
    'Placki ziemniaczane',
    'Kluski na parze',
    'Kotlet mielony',
    'Ogórek kiszony',
    'Buraczki',
    'Kebab',
    'Ziemniaczki',
    'Surówka',
    'Ryż jaśminowy'
  ];
  public pieChartData: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  public pieChartType: ChartType = 'doughnut';
  public pieChartLegend = true;
  public pieChartPlugins = [pluginDataLabels];
  public pieChartColors = [
    {
      backgroundColor: [
        '#FF4558',
        '#C7C4A7',
        '#A53FFF',
        '#0094DC',
        '#00BD98',
        '#FFC925',
        '#FF9200',
        '#FF4558',
        '#C7C4A7',
        '#A53FFF',
        '#0094DC',
        '#00BD98',
        '#FFC925',
        '#FF9200',
        '#FF4558',
        '#C7C4A7',
        '#A53FFF',
        '#0094DC',
        '#00BD98',
        '#FFC925',
        '#FF9200'
      ]
    }
  ];

  constructor() {}

  ngOnInit() {}

  getData(payload) {}
}
