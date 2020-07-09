import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { StatisticsRoutingModule } from './statistics-routing.module';
import { StatisticsComponent } from './statistics.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { ChartFiltersComponent } from './chart-filters/chart-filters.component';
import { DpDatePickerModule } from 'ng2-date-picker';
import { ChartsModule } from 'ng2-charts';

const components = [StatisticsComponent, PieChartComponent, BarChartComponent, ChartFiltersComponent];
/**
 * Statistics Module
 *
 * @export
 * @class StatisticsModule
 */
@NgModule({
  declarations: components,
  imports: [CommonModule, StatisticsRoutingModule, SharedModule, DpDatePickerModule, ChartsModule]
})
export class StatisticsModule {}
