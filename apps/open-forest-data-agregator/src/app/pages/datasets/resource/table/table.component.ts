import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as Papa from 'papaparse';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { Subject } from 'rxjs';

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
   * Data table trigger
   */
  dtTrigger: Subject<any> = new Subject();
  /**
   * Data table options
   */
  dtOptions: any = {};
  /**
   * Fullscreen
   */
  fullScreen = false;
  /**
   * Full screen event emitter
   */
  @Output() fullscreenEvent: EventEmitter<any> = new EventEmitter();

  /**
   * Resource table constructor
   * @param {HttpClient} http Http Client
   * @param sanitizer Sanitizer
   */
  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {}

  /**
   * Function that initialize on website loading and get CSV file.
   */
  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      dom: 'Bfrtip',
      bInfo: false,
      scrollY: '73vh',
      scrollCollapse: true,
      scrollX: true,
      buttons: [
        {
          text: 'Fullscreen',
          titleAttr: 'Fullscreen',
          className: 'fullscreen',
          action: () => {
            if (!this.fullScreen) {
              this.fullScreen = true;
              this.fullscreenEvent.emit(true);
            } else {
              this.fullScreen = false;
              this.fullscreenEvent.emit(false);
            }
          }
        }
      ]
    };
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
    this.http.get(path.replace('?format=original', ''), { responseType: 'text' }).subscribe(results => {
      this.csvContainer = results;
      this.parseToDisplay(this.csvContainer);
    });
  }

  /**
   * Find delimiter from content and parse for display
   * @param content Content of file
   */
  parseToDisplay(content: string) {
    // let customDelimiter = ';';
    // if (this.type === 'Comma Separated Values') {
    //   customDelimiter = ';';
    // } else if (this.type === 'Tab-Separated Values' || this.type === 'Tab-Delimited') {
    //   customDelimiter = '\t';
    // }
    Papa.parse(content, {
      header: true,
      skipEmptyLines: true,
      // delimiter: customDelimiter,
      complete: result => {
        this.convertedData = result;
        this.dtTrigger.next();
      }
    });
  }

  /**
   * Generate gallery view via lightGallery plugin
   *
   * @param {*} index
   * @param {*} el
   */
  showGallery(index, el) {
    const images = [];
    const dataFromIndex = this.convertedData.data.slice(index, this.convertedData.data.length);
    dataFromIndex.forEach((data: any) => {
      if (data['file_mimetype'] === 'image/jpeg') {
        images.push(data['file_location']);
      }
    });
    const dynamicEl = images.map(img =>
      Object.create({
        src: img,
        thumb: img
      })
    );
    // @ts-ignore
    window.lightGallery(el, {
      dynamic: true,
      dynamicEl
    });
  }

  /**
   * Sanitize video for iframe
   * @param imageLocation Image location
   */
  sanitizeVideo(imageLocation: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(imageLocation);
  }
}
