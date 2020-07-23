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
  constructor(public statisticsService: StatisticsService) {}

  ngOnInit() {
    this.getStatistics();
  }

  getStatistics() {
    this.statisticsService.getStatistics().subscribe(response => {});
  }
}
