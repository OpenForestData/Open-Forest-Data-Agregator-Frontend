import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { DrawEvents, FeatureGroup, latLng, tileLayer, Map, featureGroup } from 'leaflet';

@Component({
  selector: 'ofd-agregator-datasets-range',
  templateUrl: './datasets-range.component.html',
  styleUrls: ['./datasets-range.component.scss']
})
export class DatasetsRangeComponent implements OnInit {
  @Input() header: string;

  @Input() key: string;

  @Input() data: any[];

  @Input() isExpanded: boolean;

  @Input() value: any = null;

  @Input() multiple = true;

  @Output() valueChange: EventEmitter<any> = new EventEmitter<any>();

  public map: Map;

  public firstShow = false;

  public drawnItems: FeatureGroup = featureGroup();

  public drawOptions = {
    position: 'topright',
    draw: {
      marker: false,
      rectangle: false,
      polyline: false,
      circlemarker: false
    },
    edit: { featureGroup: this.drawnItems }
  };

  public options = {
    layers: [
      tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>'
      })
    ],
    zoomControl: false,
    zoom: 2,
    center: latLng(51.97779, 20.34941)
  };

  constructor() {}

  ngOnInit(): void {}

  onMapReady(map: Map) {
    this.map = map;
  }

  onDrawCreated(e: any) {
    const layer = (e as DrawEvents.Created).layer;
    this.drawnItems.addLayer(layer);

    const bounds = this.drawnItems.getBounds();
  }

  showHeader() {
    this.isExpanded = !this.isExpanded;

    if (this.isExpanded && !this.firstShow) {
      this.firstShow = true;
    }
  }
}
