import { Component, AfterContentInit } from '@angular/core';
import DG from '2gis-maps';
import { MarkerService } from '../services/marker.service';
import { ToastComponent } from '../shared/toast/toast.component';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterContentInit {
  markers = [];
  mapMarkers = DG.featureGroup();
  lastSearchData = DG.layerGroup();
  map;
  searches = ['Аптека', 'Магазин', 'Заправка', 'Школа', 'Ресторан'];

  constructor(private markerService: MarkerService, public toast: ToastComponent, public auth: AuthService) { }

  ngAfterContentInit() {
    this.map = DG.map('map', {
      'center': [46.411, 30.727],
      'zoom': 16,
      'zoomControl': true,
      'fullscreenControl': false
    });
    this.mapMarkers.addTo(this.map);
    this.map.on('click', (ev) => {
      this.markers.push({'name': 'Marker', 'lat': ev.latlng.lat, 'lng': ev.latlng.lng});
      DG.marker(ev.latlng).addTo(this.mapMarkers).bindPopup('Marker');
    });
  }

  /*-----------------------------------------------------------*/

  getDataFor(request) {
    this.getDGSearchData({page: 1, pageSize: 50, what: request, point: {lat: this.map.getCenter().lat, lng: this.map.getCenter().lng}, key: 'ruoedw9225'});
  }

  getDGSearchData(search: {page: number, pageSize: number, what: string, point: {lat: number, lng: number}, key: string}, clear: boolean = false) {
    if (clear) {
      this.clearSearchMarkers();
    }
    this.markerService.getDGSearchData(search).subscribe(
      data => {
        if (data.response.code > 200) {
          this.toast.setMessage('No results', 'danger');
        }
        console.log(data);
        this.appendSearchMarkers(data);
        this.toast.setMessage('You searched for ' + search.what, 'success');
      }
    );
  }

  appendSearchMarkers(data) {
    let marker;

    data.result.data.forEach(el => {
      marker = DG.marker([el.geo.lat, el.geo.lon]);
      marker.bindPopup(el.firm.name);
      marker.addTo(this.lastSearchData);
    });

    this.lastSearchData.addTo(this.map);
  }

  clearSearchMarkers() {
    this.lastSearchData.clearLayers();
    this.toast.setMessage('Deleted markers from search', 'success');
  }

  getMarkers() {
    this.markerService.getMarkers().subscribe(
      data => {
        this.markers = data;
        this.showMarkers();
      },
      error => console.log(error)
    );
  }

  addMarker(marker: {'name': string, 'lat': number, 'lng': number}, fetch: boolean = false) {
    this.markerService.addMarker(marker).subscribe(
      res => {
        this.toast.setMessage('Marker added', 'success');
        if (fetch) {
          this.getMarkers();
        }
      },
      error => this.toast.setMessage('Error while adding marker', 'danger')
    );
  }

  deleteMarker(marker) {
    this.markerService.deleteMarker(marker).subscribe(
      data => {
        this.toast.setMessage('Marker deleted succesfully', 'success');
      },
      error => console.log(error),
      () => this.getMarkers()
    );
  }

  showMarkers() {
    this.mapMarkers.clearLayers();
    this.markers.forEach(el => {
      DG.marker([el.lat, el.lng]).addTo(this.mapMarkers).bindPopup(el.name);
    });
    this.mapMarkers.addTo(this.map);
  }

  hideMarkers() {
    this.mapMarkers.clearLayers();
    this.toast.setMessage('Markers hidden', 'success');
  }

  saveMarkers() {
    for (let i = 0; i < this.markers.length; i++) {
      if (i === this.markers.length - 1) {
        this.addMarker(this.markers[i], true);
        this.toast.setMessage('Markers saved to DB', 'success');
        continue;
      }
      this.addMarker(this.markers[i]);
    }
    setTimeout(this.getMarkers(), 1000);
  }

}
