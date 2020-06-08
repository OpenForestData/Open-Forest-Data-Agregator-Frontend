import { Component, OnInit, Input } from '@angular/core';
import { featureGroup, latLng, tileLayer, Map, canvas, circleMarker, map, marker, geoJSON } from 'leaflet';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'ofd-agregator-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  private map;
  @Input() resource;
  markerContainer: any = [];
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.initMap();
    console.log('resource:', this.resource);
    this.getMarkers(this.resource);
  }

  getMarkers(path: string) {
    this.http.get(path).subscribe((results: any) => {
      // console.log('markers: ', results);
      for (const i of results.features) {
        geoJSON(i).addTo(this.map);
        // console.log('i: ', i.geometry.coordinates[0]);
        // let lat = i.geometry.coordinates[0];
        // let lon = i.geometry.coordinates[1];
        // const markers = marker([lon, lat]).addTo(this.map);
      }
    });
  }

  private initMap(): void {
    this.map = map('map', {
      center: [39.8282, -98.5795],
      zoom: 3
    });
    const tiles = tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });
    tiles.addTo(this.map);
  }
}
