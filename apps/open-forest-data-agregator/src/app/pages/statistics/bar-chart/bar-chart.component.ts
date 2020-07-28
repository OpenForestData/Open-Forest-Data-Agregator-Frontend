import { Component, Input, SimpleChanges, OnChanges } from '@angular/core';
import { ChartType, ChartDataSets } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label } from 'ng2-charts';
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
  public barChartLabels: Label[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
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
  public barChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A', backgroundColor: this.colorsArray[this.bgColor] }
  ];

  /**
   * Set color of chart on change
   *
   * @param {SimpleChanges} changes
   * @memberof BarChartComponent
   */
  ngOnChanges(changes: SimpleChanges): void {
    this.barChartData[0].backgroundColor = this.colorsArray[this.bgColor];
  }

  /**
   * Fetch data from API
   *
   * @param {*} payload
   * @memberof BarChartComponent
   */
  getData(payload) {}
}
