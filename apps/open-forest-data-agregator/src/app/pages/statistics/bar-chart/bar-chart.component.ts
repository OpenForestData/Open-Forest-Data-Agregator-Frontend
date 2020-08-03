import { Component, Input, SimpleChanges, OnChanges, Output, EventEmitter, ViewChild } from '@angular/core';
import { ChartType } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { BaseChartDirective, Label } from 'ng2-charts';
/**
 * Bar chart
 *
 * @export
 * @class BarChartComponent
 * @implements {OnInit}
 * @implements {OnChanges}
 */
@Component({
  selector: 'ofd-agregator-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnChanges {
  @Input() public chartType = '';

  @Output() public filterChange: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild(BaseChartDirective) public chart: BaseChartDirective;
  /**
   * Chart color
   *
   * @memberof BarChartComponent
   */
  @Input() bgColor = 0;

  /**
   * Bar chart options
   *
   * @memberof BarChartComponent
   */
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end'
      }
    }
  };
  /**
   * Chart labels
   *
   * @type {Label[]}
   * @memberof BarChartComponent
   */
  @Input() public barChartLabels: Label[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  /**
   * Chart type
   *
   * @type {ChartType}
   * @memberof BarChartComponent
   */
  public barChartType: ChartType = 'bar';
  /**
   * If show chart legend
   *
   * @memberof BarChartComponent
   */
  public barChartLegend = false;

  /**
   * Chart plugins
   *
   * @memberof BarChartComponent
   */
  public barChartPlugins = [pluginDataLabels];

  /**
   * Chart colors
   *
   * @memberof BarChartComponent
   */
  public colorsArray = ['#FCCD56', '#EE6083', '#9964F7'];

  /**
   * Data for chart
   *
   * @type {ChartDataSets[]}
   * @memberof BarChartComponent
   */
  @Input() public barChartData: any[] = [];

  @Input() public barChartDatasets = [];

  public dataSum = 0;

  @Input() public showCount = true;

  @Input() public chartTitle = 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ullam, dolore.';

  /**
   * Set color of chart on change
   *
   * @param {SimpleChanges} changes
   * @memberof BarChartComponent
   */
  ngOnChanges(changes: SimpleChanges): void {
    // this.barChartData[0].backgroundColor = this.colorsArray[this.bgColor];
    if (this.barChartData.length > 0) this.dataSum = this.barChartData.reduce((prev, curr) => prev + curr, 0);
    if (this.barChartDatasets.length > 0) {
      let sum = 0;
      this.barChartDatasets.forEach(item => {
        sum = item.data.reduce((prev, curr) => prev + curr, sum);
      });
      this.dataSum = sum;
    }
  }

  /**
   * Fetch data from API
   *
   * @param {*} data
   * @memberof BarChartComponent
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
