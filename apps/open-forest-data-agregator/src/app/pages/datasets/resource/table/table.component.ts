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
  @Input() type;
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
      console.log('convetrted csv:', this.csvContainer);
      this.parseToDisplay(this.csvContainer);
    });
  }

  parseToDisplay(content: string) {
    let customDelimiter = ';';
    if (this.type === 'Comma Separated Values') {
      customDelimiter = ';';
    } else if (this.type === 'Tab-Separated Values') {
      customDelimiter = '\\t';
    }
    Papa.parse(content, {
      header: true,
      skipEmptyLines: true,
      delimiter: customDelimiter,
      complete: result => {
        this.convertedData = result;
      }
    });
  }
}
