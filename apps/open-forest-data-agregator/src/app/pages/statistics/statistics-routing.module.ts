import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StatisticsComponent } from './statistics.component';

const routes: Routes = [{ path: '', component: StatisticsComponent }];
/**
 * Routing for Statistics Module
 *
 * @export
 * @class StatisticsRoutingModule
 */
@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)]
})
export class StatisticsRoutingModule {}
