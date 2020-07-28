import { Component, EventEmitter, Input, Output, OnChanges, OnDestroy } from '@angular/core';

import { DrawEvents, FeatureGroup, latLng, tileLayer, Map, featureGroup, rectangle, Control } from 'leaflet';
import { Subscription } from 'rxjs';
import { DatasetsService } from '../../datasets.service';
/**
 * Map filter component
 */
@Component({
  selector: 'ofd-agregator-datasets-range',
  templateUrl: './datasets-range.component.html',
  styleUrls: ['./datasets-range.component.scss']
})
export class DatasetsRangeComponent implements OnChanges, OnDestroy {
  /**
   * Values for filter
   * I.e. for Select OR Autocomplete
   */
  @Input() data: any[] = [];

  /**
   * Current value
   */
  @Input() value: any = null;

  /**
   * Has filter multiple options
   */
  @Input() multiple = true;

  /**
   * Define whatever filter is visible
   */
  @Input() isExpanded: boolean;

  /**
   * Event emitter for value change
   */
  @Output() valueChange: EventEmitter<any> = new EventEmitter<any>();

  /**
   * Leaflet layers
   */
  public layers = [];

  /**
   * Leaflet map reference
   */
  public map: Map;

  /**
   * @ignore
   */
  public sub: Subscription;

  /**
   * Leaflet featureGroup
   */
  public drawnItems: FeatureGroup = featureGroup();

  /**
   * Leaflet draw options
   */
  public drawOptions: Control.DrawConstructorOptions = {
    position: 'topright',
    draw: {
      marker: false,
      circle: false,
      polygon: false,
      polyline: false,
      circlemarker: false
    },
    edit: { featureGroup: this.drawnItems }
  };

  /**
   * Leaflet options
   */
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

  /**
   * Creates an instance of DatasetsRangeComponent.
   * @param {DatasetsService} DSService Datasets service
   */
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
            this.map.removeLayer(layer);
          });
        }
      }, 50);
    });
  }

  /**
   * Rerender map on input change
   *
   * @param {any} changes Changes
   */
  ngOnChanges(changes) {
    if (this.isExpanded && this.map) this.map.invalidateSize();
  }

  /**
   * Initialize map when leaflet ready
   *
   * @param {Map} map Map
   */
  onMapReady(map: Map) {
    this.map = map;
    if (this.value.length) {
      this.drawnItems.addLayer(rectangle(this.value));
      const layer = rectangle(this.value);
      this.layers.push(layer);
    }
  }

  /**
   * Creates drawing layer on map when drawn
   *
   * @param {any} e Event
   */
  onDrawCreated(e: any) {
    const layer = (e as DrawEvents.Created).layer;
    this.drawnItems.addLayer(layer);

    const bounds = this.drawnItems.getBounds();

    this.layers.push(layer);

    this.valueChange.emit([bounds[Object.keys(bounds)[0]], bounds[Object.keys(bounds)[1]]]);
  }

  /**
   * @ignore
   */
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
