import { Component, EventEmitter, Input, OnChanges, Output, ViewChild } from '@angular/core';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { BaseChartDirective, Label } from 'ng2-charts';
import { ChartOptions, ChartType } from 'chart.js';
import { StatisticsService } from '@app/pages/statistics/statistics.service';

/**
 * Pie Chart
 *
 * @export
 * @class PieChartComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'ofd-agregator-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnChanges {
  @Input() public chartType = '';

  @Output() public filterChange = new EventEmitter();

  @ViewChild(BaseChartDirective) public chart: BaseChartDirective;

  /**
   * Options for chart
   *
   * @type {ChartOptions}
   * @memberof PieChartComponent
   */
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
          return ctx.chart.data.labels[ctx.dataIndex];
        }
      }
    }
  };

  /**
   * Labels for chart
   */
  @Input() public pieChartLabels: Label[] = [];

  /**
   * Chart data
   *
   * @type {number[]}
   * @memberof PieChartComponent
   */
  @Input() public pieChartData: any[] = [];

  /**
   * Chart type
   *
   * @memberof PieChartComponent
   */
  public pieChartType: ChartType = 'doughnut';

  /**
   * is legend visible
   *
   * @memberof PieChartComponent
   */
  public pieChartLegend = true;

  /**
   * Chart plugins
   *
   * @memberof PieChartComponent
   */
  public pieChartPlugins: any = [pluginDataLabels];

  /**
   * Colors for chart
   *
   * @memberof PieChartComponent
   */
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

  public dataSum = 0;

  @Input() public chartTitle = '';

  @Input() public showCount = true;

  constructor(public statisticsService: StatisticsService) {}

  ngOnChanges(changes) {
    if (this.chart !== undefined) {
      // this.chart.ngOnChanges({});
      // this.chart.ngOnDestroy();
      // this.chart.chart = this.chart.getChartBuilder(this.chart.ctx);
      this.dataSum = this.pieChartData.reduce((prev, curr) => prev + curr, 0);
    }
  }

  /**
   * Get data
   * @param {any} data Payload
   */
  getData(data) {
    const payload = {
      'data-type': this.chartType,
      from: data.startDate
        .split('-')
        .reverse()
        .join('-'),
      to: data.endDate
        .split('-')
        .reverse()
        .join('-')
    };
    this.filterChange.emit(payload);
  }
}
