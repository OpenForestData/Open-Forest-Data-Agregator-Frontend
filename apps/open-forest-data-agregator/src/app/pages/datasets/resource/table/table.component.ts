import { Component, OnInit, Input } from '@angular/core';
import * as Papa from 'papaparse';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Component({
  selector: 'ofd-agregator-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Input() resource;
  csvContainer = '';
  convertedData: any = {};
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getCSV(this.resource);
  }

  keepOrder = (a, b) => {
    return a;
  };

  getCSV(path: string) {
    this.http.get(path, { responseType: 'text' }).subscribe(results => {
      this.csvContainer = results;
      this.parseToDisplay(this.csvContainer);
    });
  }

  parseToDisplay(content: string) {
    Papa.parse(content, {
      header: true,
      skipEmptyLines: true,
      delimiter: ';',
      complete: result => {
        this.convertedData = result;
        console.log(this.convertedData);
      }
    });
  }
}
