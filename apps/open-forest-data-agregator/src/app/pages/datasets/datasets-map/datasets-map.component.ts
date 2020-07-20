import { ChangeDetectorRef, Component, Input, NgZone, OnChanges, OnInit } from '@angular/core';
import { featureGroup, latLng, tileLayer, Map, canvas, circleMarker } from 'leaflet';
import { UtilsService } from '@app/services/utils.service';
/**
 * Datasets view on map
 *
 * @export
 * @class DatasetsMapComponent
 * @implements {OnInit}
 * @implements {OnChanges}
 */
@Component({
  selector: 'ofd-agregator-datasets-map',
  templateUrl: './datasets-map.component.html',
  styleUrls: ['./datasets-map.component.scss']
})
export class DatasetsMapComponent implements OnChanges {
  /**
   * Datasets
   *
   * @type {*}
   * @memberof DatasetsMapComponent
   */
  @Input() datasets: any = [];

  /**
   * Number of actives markers no map
   *
   * @memberof DatasetsMapComponent
   */
  public activeMarkes = 0;

  /**
   * Leaflet options
   *
   * @memberof DatasetsMapComponent
   */
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

  /**
   * Leaflet featureGroup for markers
   *
   * @memberof DatasetsMapComponent
   */
  public datasetsMarkers = featureGroup([]);

  /**
   * Reference to leaflet map object
   *
   * @type {Map}
   * @memberof DatasetsMapComponent
   */
  public map: Map;

  /**
   * Datasets details options
   *
   * @memberof DatasetsMapComponent
   */
  public datasetDetails = {
    show: false,
    dataset: null
  };

  /**
   * Creates an instance of DatasetsMapComponent.
   * @param {NgZone} zone
   * @param {ChangeDetectorRef} changeDetectorRef
   * @param {UtilsService} utilsService Utility service
   * @memberof DatasetsMapComponent
   */
  constructor(private zone: NgZone, private changeDetectorRef: ChangeDetectorRef, public utilsService: UtilsService) {}

  /**
   * Gets map reference once leaflet is ready
   *
   * @param {Map} map
   * @memberof DatasetsMapComponent
   */
  onMapReady(map: Map) {
    this.map = map;
    this.map.fitBounds(this.datasetsMarkers.getBounds());
  }

  /**
   * Rerenders map on data change
   *
   * @memberof DatasetsMapComponent
   */
  ngOnChanges() {
    this.renderMarkers();
  }

  /**
   * Render markers
   *
   * @memberof DatasetsMapComponent
   */
  renderMarkers() {
    const markers = this.getMarkers();
    this.datasetsMarkers.clearLayers();

    markers.map(marker => {
      this.datasetsMarkers.addLayer(marker);
    });
  }

  /**
   * Creates leaflet marker object
   *
   * @returns
   * @memberof DatasetsMapComponent
   */
  getMarkers() {
    const coords = this.datasets.filter(item => item['coordinates'].length);
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

  /**
   * Callback after marker click.
   * Shows Dataset details
   *
   * @param {*} dataset
   * @memberof DatasetsMapComponent
   */
  selectDataset(dataset) {
    this.datasetDetails = {
      ...this.datasetDetails,
      show: true,
      dataset
    };

    this.changeDetectorRef.detectChanges();
  }

  /**
   * Closes dataset details
   *
   * @memberof DatasetsMapComponent
   */
  closeDetails() {
    this.datasetDetails = {
      ...this.datasetDetails,
      show: false
    };

    this.changeDetectorRef.detectChanges();
  }
}
