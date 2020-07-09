import { Component, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChange, OnDestroy } from '@angular/core';

import { DrawEvents, FeatureGroup, latLng, tileLayer, Map, featureGroup, rectangle } from 'leaflet';
import { Subscription } from 'rxjs';
import { DatasetsService } from '../../datasets.service';
/**
 * Map filter component
 *
 * @export
 * @class DatasetsRangeComponent
 * @implements {OnInit}
 * @implements {OnChanges}
 * @implements {OnDestroy}
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
   *
   * @type {any[]}
   * @memberof DatasetsFilterComponent
   */
  @Input() data: any[] = [];

  /**
   * Current value
   *
   * @type {*}
   * @memberof DatasetsFilterComponent
   */
  @Input() value: any = null;

  /**
   * Has filter multiple options
   *
   * @memberof DatasetsFilterComponent
   */
  @Input() multiple = true;

  /**
   * Define whatever filter is visible
   *
   * @type {boolean}
   * @memberof DatasetsRangeComponent
   */
  @Input() isExpanded: boolean;

  /**
   * Event emmiter for value change
   *
   * @memberof DatasetsFilterComponent
   */
  @Output() valueChange: EventEmitter<any> = new EventEmitter<any>();

  /**
   * Leaflet layers
   *
   * @memberof DatasetsRangeComponent
   */
  public layers = [];

  /**
   * Leaflet map reference
   *
   * @type {Map}
   * @memberof DatasetsRangeComponent
   */
  public map: Map;

  /**
   * @ignore
   *
   * @type {Subscription}
   * @memberof DatasetsRangeComponent
   */
  public sub: Subscription;

  /**
   * Leaflet eatureGroup
   *
   * @type {FeatureGroup}
   * @memberof DatasetsRangeComponent
   */
  public drawnItems: FeatureGroup = featureGroup();

  /**
   * Leaflet draw options
   *
   * @memberof DatasetsRangeComponent
   */
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

  /**
   * Leaflet options
   *
   * @memberof DatasetsRangeComponent
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
   * @param {DatasetsService} DSService
   * @memberof DatasetsRangeComponent
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
            // console.log(layer);
            this.map.removeLayer(layer);
          });
        }
      }, 50);
    });
  }

  /**
   * Rerender map on input change
   *
   * @param {*} changes
   * @memberof DatasetsRangeComponent
   */
  ngOnChanges(changes) {
    if (this.isExpanded && this.map) this.map.invalidateSize();
  }

  /**
   * Initzialize map when leaflet ready
   *
   * @param {Map} map
   * @memberof DatasetsRangeComponent
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
   * Creates darwing layer on map when drawn
   *
   * @param {*} e
   * @memberof DatasetsRangeComponent
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
   *
   * @memberof DatasetsRangeComponent
   */
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
