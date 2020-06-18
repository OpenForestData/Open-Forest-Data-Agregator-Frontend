import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DatasetService {
  public url = 'https://agregator.whiteaster.com/api/v1/';

  constructor(private http: HttpClient) {}

  getDatasetByDOI(doi: any) {
    return this.http.get<any>(`${this.url}dataset?identifier=${doi}`);
  }

  getResourceByID(id: number) {
    return this.http.get<any>(`${this.url}resource/${id}`);
  }
}
