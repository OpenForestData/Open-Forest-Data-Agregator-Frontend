import { Component, OnInit, Input } from '@angular/core';
import {
  featureGroup,
  latLng,
  tileLayer,
  Map,
  canvas,
  circleMarker,
  map,
  icon,
  Marker,
  geoJSON,
  TileLayer
} from 'leaflet';
import { HttpClient } from '@angular/common/http';
import '@asymmetrik/ngx-leaflet';
import 'leaflet-kml';
import 'georaster-layer-for-leaflet';
import * as omnivore from '@mapbox/leaflet-omnivore';
import 'shapefile';
declare let GeoRasterLayer;
declare let parseGeoraster;
declare let L;
declare let shapefile;
@Component({
  selector: 'ofd-agregator-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  private map;
  tiles;
  @Input() resource = '';
  @Input() type;
  markerContainer: any = [];

  constructor(private http: HttpClient) {}

  /**
   * Function that initialize at the start of website loading. Creates santinized link.
   */
  ngOnInit() {
    this.setMarker();
    this.initMap();
    this.getMarkers(this.resource);
  }

  /**
   * Creates markers that leaflet lacks
   */
  setMarker() {
    const iconRetinaUrl = '/assets/images/marker-icon-2x.png';
    const iconUrl = '/assets/images/marker-icon.png';
    const shadowUrl = '/assets/images/marker-shadow.png';
    const iconDefault = icon({
      iconRetinaUrl,
      iconUrl,
      shadowUrl,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [41, 41]
    });
    Marker.prototype.options.icon = iconDefault;
  }

  /**
   * Main function for recognizing type and show it on map
   * @param path Path to single resource file
   * @example getMarkers('geotiff')
   * Runs fetchGeoTiff('geotiff')
   */
  getMarkers(path: string) {
    if (this.type === 'application/geo+json') {
      this.http.get(path).subscribe((results: any) => {
        for (const i of results.features) {
          geoJSON(i).addTo(this.map);
        }
      });
    } else if (this.type === 'geotiff') {
      this.fetchGeoTiff(path);
    } else if (this.type === 'application/vnd.google-earth.kml+xml') {
      this.fetchKML(this.resource);
    } else if (this.type === 'wkt') {
      omnivore.wkt(path).addTo(this.map);
    } else if (this.type === 'Shape') {
      console.log('IM IN SHP ELSE IF');
      this.getShp(path);
    }
  }

  /**
   * Display SHP file on map
   * @param path Path with current resource
   */
  getShp(path) {
    const shpLayer = L.geoJSON().addTo(this.map);
    shapefile
      .open(path)
      .then(source =>
        source.read().then(function log(result) {
          if (result.done) return;
          shpLayer.addData(result.value);
          return source.read().then(log);
        })
      )
      .catch(error => console.error(error.stack));
  }

  /**
   * Display GEOTiff file on map
   * @param path Path to resource file
   */
  fetchGeoTiff(path) {
    fetch(path)
      .then(response => response.arrayBuffer())
      .then(arrayBuffer => {
        parseGeoraster(arrayBuffer).then(georaster => {
          const layer = new GeoRasterLayer({
            georaster,
            opacity: 0.7,
            pixelValuesToColorFn: values => (values[0] === 42 ? '#ffffff' : '#000000'),
            resolution: 64
          });
          layer.addTo(this.map);
          this.map.fitBounds(layer.getBounds());
        });
      });
  }

  /**
   * Get KML file and display it on map
   * @param path File path to resource
   */
  fetchKML(path) {
    fetch(path)
      .then(response => response.text())
      .then(kmltext => {
        const parser = new DOMParser();
        const kml = parser.parseFromString(kmltext, 'text/xml');
        const track = new L.KML(kml);
        this.map.addLayer(track);
        const bounds = track.getBounds();
        this.map.fitBounds(bounds);
      });
  }

  /**
   * Initialize map and set view on global map
   */
  private initMap(): void {
    this.map = new L.Map('map');
    this.tiles = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
    this.map.setView([0, 0], 0);
    this.map.addLayer(this.tiles);
  }
}
