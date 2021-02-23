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
   * Statistics Data
   */
  public statisticsData = {
    datasetsCategory: {
      labels: [],
      data: []
    },
    datasetsByDate: {
      labels: [],
      data: []
    },
    addedFilesCategory: {
      labels: [],
      data: []
    },
    addedFilesByDate: {
      labels: [],
      data: []
    },
    downloadedFilesCategory: {
      labels: [],
      data: []
    },
    downloadedFilesByDate: {
      labels: [],
      data: []
    },
    addedDataversesCategory: {
      labels: [],
      data: []
    },
    addedDataversesBySubject: {
      labels: [],
      datasets: []
    },
    fiveStarBar: {
      labels: [],
      data: []
    },
    fiveStarChart: {
      labels: [],
      data: []
    }
  };

  /**
   * Statistics component constructor
   * @param {StatisticsService} statisticsService Statistics service
   */
  constructor(public statisticsService: StatisticsService) {}

  /**
   * Get statistics data on component init
   */
  ngOnInit() {}

  /**
   * Get chart data for datasets
   * @param {any} payload Filters
   */
  getDatasetsByCategoryData(payload) {
    setTimeout(() => {
      this.statisticsData.datasetsCategory.labels = [];
    });
    this.statisticsData.datasetsCategory.data = [];
    this.statisticsService.getStatistics(payload).subscribe(response => {
      Object.keys(response['months']).forEach(key => {
        this.statisticsData.datasetsCategory.data = [
          ...this.statisticsData.datasetsCategory.data,
          response['months'][key]
        ];
        setTimeout(() => {
          this.statisticsData.datasetsCategory.labels = [...this.statisticsData.datasetsCategory.labels, key];
        });
      });
    });
  }

  /**
   * Get chart data for added files
   * @param {any} payload Filters
   */
  getAddedFilesByCategory(payload) {
    setTimeout(() => {
      this.statisticsData.addedFilesCategory.labels = [];
    });
    this.statisticsData.addedFilesCategory.data = [];
    this.statisticsService.getStatistics(payload).subscribe(response => {
      setTimeout(() => {
        this.statisticsData.addedFilesCategory.labels = [];
      });
      this.statisticsData.addedFilesCategory.data = [];
      Object.keys(response['months']).forEach(key => {
        this.statisticsData.addedFilesCategory.data = [
          ...this.statisticsData.addedFilesCategory.data,
          response['months'][key]
        ];
        setTimeout(() => {
          this.statisticsData.addedFilesCategory.labels = [...this.statisticsData.addedFilesCategory.labels, key];
        });
      });
    });
  }

  /**
   * Get chart data for downloaded files
   * @param {any} payload Filters
   */
  getDownloadedFilesByCategory(payload) {
    setTimeout(() => {
      this.statisticsData.downloadedFilesCategory.labels = [];
    });
    this.statisticsData.downloadedFilesCategory.data = [];
    this.statisticsService.getStatistics(payload).subscribe(response => {
      Object.keys(response['months']).forEach(key => {
        this.statisticsData.downloadedFilesCategory.data = [
          ...this.statisticsData.downloadedFilesCategory.data,
          response['months'][key]
        ];
        setTimeout(() => {
          this.statisticsData.downloadedFilesCategory.labels = [
            ...this.statisticsData.downloadedFilesCategory.labels,
            key
          ];
        });
      });
    });
  }

  /**
   * Get chart data for datasets
   * @param {any} payload Filters
   */
  getDatasetsByDate(payload) {
    setTimeout(() => {
      this.statisticsData.datasetsByDate.labels = [];
    });
    this.statisticsData.datasetsByDate.data = [];
    this.statisticsService.getStatistics(payload).subscribe(response => {
      Object.keys(response['months']).forEach(key => {
        this.statisticsData.datasetsByDate.data = [...this.statisticsData.datasetsByDate.data, response['months'][key]];
        setTimeout(() => {
          this.statisticsData.datasetsByDate.labels = [...this.statisticsData.datasetsByDate.labels, key];
        });
      });
    });
  }

  /**
   * Get chart data for added files
   * @param {any} payload Filters
   */
  getAddedFilesByDate(payload) {
    this.statisticsService.getStatistics(payload).subscribe(response => {
      setTimeout(() => {
        this.statisticsData.addedFilesByDate.labels = [];
      });
      this.statisticsData.addedFilesByDate.data = [];
      Object.keys(response['months']).forEach(key => {
        this.statisticsData.addedFilesByDate.data = [
          ...this.statisticsData.addedFilesByDate.data,
          response['months'][key]
        ];
        setTimeout(() => {
          this.statisticsData.addedFilesByDate.labels = [...this.statisticsData.addedFilesByDate.labels, key];
        });
      });
    });
  }

  /**
   * Get chart data for downloaded files
   * @param {any} payload Filters
   */
  getDownloadFilesByDate(payload) {
    this.statisticsService.getStatistics(payload).subscribe(response => {
      setTimeout(() => {
        this.statisticsData.downloadedFilesByDate.labels = [];
      });
      this.statisticsData.downloadedFilesByDate.data = [];
      Object.keys(response['months']).forEach(key => {
        this.statisticsData.downloadedFilesByDate.data = [
          ...this.statisticsData.downloadedFilesByDate.data,
          response['months'][key]
        ];
        setTimeout(() => {
          this.statisticsData.downloadedFilesByDate.labels = [...this.statisticsData.downloadedFilesByDate.labels, key];
        });
      });
    });
  }

  /**
   * Get chart data for dataverses
   * @param {any} payload Filters
   */
  getAddedDataversesCategory(payload) {
    this.statisticsService.getStatistics(payload).subscribe(response => {
      setTimeout(() => {
        this.statisticsData.addedDataversesCategory.labels = [];
      });
      this.statisticsData.addedDataversesCategory.data = [];
      response['by_dataverse'].forEach(row => {
        setTimeout(() => {
          this.statisticsData.addedDataversesCategory.labels = [
            ...this.statisticsData.addedDataversesCategory.labels,
            row['category']
          ];
        });
        this.statisticsData.addedDataversesCategory.data = [
          ...this.statisticsData.addedDataversesCategory.data,
          row['count']
        ];
      });
    });
  }

  /**
   * Get chart data for dataverses
   * @param {any} payload Filters
   */
  getAddedDataversesSubject(payload) {
    this.statisticsService.getStatistics(payload).subscribe(response => {
      setTimeout(() => {
        this.statisticsData.addedDataversesBySubject.labels = [];
      });
      this.statisticsData.addedDataversesBySubject.datasets = [];

      // let datasets = [];
      // let chartLabels = [];
      let labels = [];
      let values = [];
      // const data = response['by_subject'];
      const data = response['months'];
      // const dataQ = {};

      Object.keys(data).forEach(key => {
        labels = [...labels, key];
        values = [...values, data[key]];
      });

      // Object.keys(data).forEach(key => {
      //   labels.forEach(label => {
      //     if (!dataQ[label]) dataQ[label] = {};
      //     if (typeof dataQ[label][key] === 'undefined') dataQ[label][key] = 0;
      //     const filteredItem = data[key].filter(item => item.subject === label);
      //     dataQ[label][key] = filteredItem.length === 0 ? 0 : dataQ[label][key] + filteredItem[0].count;
      //   });
      // });

      // chartLabels = Object.keys(data);

      // Object.keys(dataQ).forEach(key => {
      //   const d = Object.values(dataQ[key]);
      //   datasets = [...datasets, { label: key, data: d }];
      // });

      setTimeout(() => {
        this.statisticsData.addedDataversesBySubject.labels = labels;
      });
      this.statisticsData.addedDataversesBySubject.datasets = values;
    });
  }

  /**
   * Get chart data for five star
   * @param {any} payload Filters
   */
  getFiveStarStatisticsChart(payload) {
    delete payload['data-type'];
    this.statisticsService.getStatistics(payload).subscribe(response => {
      setTimeout(() => {
        this.statisticsData.fiveStarChart.labels = [];
      });
      this.statisticsData.fiveStarChart.data = [];
      response['five_star_metrics']['ratings'].forEach(item => {
        this.statisticsData.fiveStarChart.data = [...this.statisticsData.fiveStarChart.data, item.amount];
        setTimeout(() => {
          this.statisticsData.fiveStarChart.labels = [...this.statisticsData.fiveStarChart.labels, item.star];
        });
      });
    });
  }

  /**
   * Get chart data for five star
   * @param {any} payload Filters
   */
  getFiveStarStatisticsBar(payload) {
    delete payload['data-type'];
    this.statisticsService.getStatistics(payload).subscribe(response => {
      setTimeout(() => {
        this.statisticsData.fiveStarBar.labels = [];
      });
      this.statisticsData.fiveStarBar.data = [];
      response['five_star_metrics']['ratings'].forEach(item => {
        this.statisticsData.fiveStarBar.data = [...this.statisticsData.fiveStarBar.data, item.amount];
        setTimeout(() => {
          this.statisticsData.fiveStarBar.labels = [...this.statisticsData.fiveStarBar.labels, item.star];
        });
      });
    });
  }
}
