import { ChangeDetectorRef, Component, Input, NgZone, OnChanges, OnInit } from '@angular/core';

import { featureGroup, latLng, tileLayer, Map, canvas, circleMarker } from 'leaflet';

@Component({
  selector: 'ofd-agregator-datasets-map',
  templateUrl: './datasets-map.component.html',
  styleUrls: ['./datasets-map.component.scss']
})
export class DatasetsMapComponent implements OnInit, OnChanges {
  @Input() datasets: any = [];
  public activeMarkes = 0;

  public options = {
    renderer: canvas(),
    preferCanvas: true,
    layers: [
      tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>'
      })
    ],
    zoomControl: true,
    zoom: 2,
    center: latLng(51.97779, 20.34941)
  };

  public datasetsMarkers = featureGroup([]);

  public map: Map;

  public datasetDetails = {
    show: false,
    dataset: null
  };

  constructor(private zone: NgZone, private changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit(): void {}

  onMapReady(map: Map) {
    this.map = map;

    this.map.fitBounds(this.datasetsMarkers.getBounds());
  }

  ngOnChanges() {
    this.renderMarkers();
  }

  renderMarkers() {
    const markers = this.getMarkers();

    markers.map(marker => {
      this.datasetsMarkers.addLayer(marker);
    });

    if (this.map) {
      this.map.fitBounds(this.datasetsMarkers.getBounds());
    }
  }

  getMarkers() {
    const coords = this.datasets.filter(item => item['coordinates']);
    this.activeMarkes = coords.length;

    return coords.map(dataset => {
      const coordinates = dataset['coordinates'][0];

      return circleMarker([coordinates.lat, coordinates.long], {
        radius: 5,
        fillColor: '#ff0000',
        weight: 0,
        opacity: 1,
        fillOpacity: 1
      }).on('click', () => {
        this.selectDataset(dataset);
      });
    });
  }

  selectDataset(dataset) {
    this.datasetDetails = {
      ...this.datasetDetails,
      show: true,
      dataset
    };

    this.changeDetectorRef.detectChanges();
  }

  closeDetails() {
    this.datasetDetails = {
      ...this.datasetDetails,
      show: false
    };

    this.changeDetectorRef.detectChanges();
  }
}
