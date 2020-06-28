import { Component, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChange, OnDestroy } from '@angular/core';

import { DrawEvents, FeatureGroup, latLng, tileLayer, Map, featureGroup, rectangle } from 'leaflet';
import { Subscription } from 'rxjs';
import { DatasetsService } from '../../datasets.service';

@Component({
  selector: 'ofd-agregator-datasets-range',
  templateUrl: './datasets-range.component.html',
  styleUrls: ['./datasets-range.component.scss']
})
export class DatasetsRangeComponent implements OnInit, OnChanges, OnDestroy {
  @Input() data: any[];

  @Input() isExpanded: boolean;

  @Input() value: any = null;

  @Input() multiple = true;

  @Output() valueChange: EventEmitter<any> = new EventEmitter<any>();

  public layers = [];

  public map: Map;

  public sub: Subscription;

  public drawnItems: FeatureGroup = featureGroup();

  public drawOptions = {
    position: 'topright',
    draw: {
      marker: false,
      rectangle: true,
      circle: false,
      polygon: false,
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

  constructor(public DSService: DatasetsService) {
    this.sub = this.DSService.newFiltersStructureSubject.subscribe(_ => {
      setTimeout(() => {
        this.drawnItems = featureGroup();
        if (this.value.length) {
          const layer = rectangle(this.value);
          this.layers.push(layer);

          this.drawnItems.addLayer(layer);
        } else {
          this.layers.forEach(layer => {
            // console.log(layer);
            this.map.removeLayer(layer);
          });
        }
      }, 50);
    });
  }

  ngOnInit(): void {}

  ngOnChanges(changes) {
    if (this.isExpanded && this.map) this.map.invalidateSize();
  }

  onMapReady(map: Map) {
    this.map = map;
    if (this.value.length) {
      this.drawnItems.addLayer(rectangle(this.value));
      const layer = rectangle(this.value);
      this.layers.push(layer);
    }
  }

  onDrawCreated(e: any) {
    const layer = (e as DrawEvents.Created).layer;
    this.drawnItems.addLayer(layer);

    const bounds = this.drawnItems.getBounds();

    this.layers.push(layer);

    this.valueChange.emit([bounds[Object.keys(bounds)[0]], bounds[Object.keys(bounds)[1]]]);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
