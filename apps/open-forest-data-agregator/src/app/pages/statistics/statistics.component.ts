import { Component, OnInit } from '@angular/core';
import { StatisticsService } from '@app/pages/statistics/statistics.service';

/**
 * Main statistics component
 */
@Component({
  selector: 'ofd-agregator-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {
  /**
   * Statistics component constructor
   * @param {StatisticsService} statisticsService Statistics service
   */
  constructor(public statisticsService: StatisticsService) {}

  /**
   * Get statistics data on component init
   */
  ngOnInit() {
    this.getStatistics();
  }

  /**
   * Get statistics data
   */
  getStatistics() {
    this.statisticsService.getStatistics().subscribe(() => {});
  }
}
