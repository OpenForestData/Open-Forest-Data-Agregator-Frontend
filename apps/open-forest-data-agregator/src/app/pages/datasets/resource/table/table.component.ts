import { Component, OnInit, Input } from '@angular/core';
import * as Papa from 'papaparse';
import { HttpClient } from '@angular/common/http';

/**
 * Resource table component
 */
@Component({
  selector: 'ofd-agregator-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  /**
   * Resource
   */
  @Input() resource;
  /**
   * Type of resource
   */
  @Input() type;
  /**
   * CSV container
   */
  csvContainer = '';
  /**
   * Converted data object
   */
  convertedData: any = {};

  /**
   * Resource table constructor
   * @param {HttpClient} http Http Client
   */
  constructor(private http: HttpClient) {}

  /**
   * Function that initialize on website loading and get CSV file.
   */
  ngOnInit() {
    this.getCSV(this.resource);
  }

  /**
   * Function that keep sorting in keyvalue pipe
   * @param a Sorting value a
   * @param b Sorting value b
   */
  keepOrder = (a, b) => {
    return a;
  };

  /**
   * Get resource in type of text and parse it
   * @param path Path to resource
   */
  getCSV(path: string) {
    this.http.get(path, { responseType: 'text' }).subscribe(results => {
      this.csvContainer = results;
      this.parseToDisplay(this.csvContainer);
    });
  }

  /**
   * Find delimiter from content and parse for display
   * @param content Content of file
   */
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