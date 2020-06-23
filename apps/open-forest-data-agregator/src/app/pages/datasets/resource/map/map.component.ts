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
// import shapefile from 'shapefile';
declare let GeoRasterLayer;
declare let parseGeoraster;
declare let L;
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

  ngOnInit() {
    this.setMarker();
    this.initMap();
    this.getMarkers(this.resource);
  }

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

  getMarkers(path: string) {
    if (this.type === 'application/geo+json') {
      this.http.get(path).subscribe((results: any) => {
        console.log('geojson results: ', results);
        for (const i of results.features) {
          geoJSON(i).addTo(this.map);
        }
      });
    } else if (this.type === 'geotiff') {
      this.fetchGeoTiff(path);
      console.log('Not done yet');
    } else if (this.type === 'application/vnd.google-earth.kml+xml') {
      this.fetchKML(this.resource);
    } else if (this.type === 'wkt') {
      omnivore.wkt(path).addTo(this.map);
    } else if (this.type === 'shp') {
      console.log('IM IN SHP ELSE IF');
      // this.getShp(path);
    }
  }

  // getShp(path) {
  //   console.log('shp path: ', path);
  //   const shpLayer = L.geoJSON().addTo(this.map);
  //   shapefile
  //     .open(path)
  //     .then(source =>
  //       source.read().then(function log(result) {
  //         if (result.done) return;
  //         shpLayer.addData(result.value);
  //         return source.read().then(log);
  //       })
  //     )
  //     .catch(error => console.error(error.stack));
  // }

  fetchGeoTiff(path) {
    console.log('parseGeoraster: ', L);
    fetch(path)
      .then(response => response.arrayBuffer())
      .then(arrayBuffer => {
        parseGeoraster(arrayBuffer).then(georaster => {
          console.log('georaster: ', georaster);
          const layer = new GeoRasterLayer({
            georaster,
            opacity: 0.7,
            pixelValuesToColorFn: values => (values[0] === 42 ? '#ffffff' : '#000000'),
            resolution: 64 // optional parameter for adjusting display resolution
          });
          layer.addTo(this.map);
          this.map.fitBounds(layer.getBounds());
        });
      });
  }

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

  private initMap(): void {
    this.map = new L.Map('map');
    this.tiles = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
    this.map.setView([0, 0], 0);
    this.map.addLayer(this.tiles);
  }
}
