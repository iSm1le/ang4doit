import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class MarkerService {

  private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http) { }

  countMarkers(): Observable<any> {
    return this.http.get('/api/map/markers/count').map(res => res.json);
  }

  getMarkers(): Observable<any> {
    return this.http.get('/api/map/markers').map(res => res.json());
  }

  getMarker(): Observable<any> {
    return this.http.get('/api/map/marker').map(res => res.json());
  }

  addMarker(marker): Observable<any> {
    return this.http.post(`/api/map/marker`, JSON.stringify(marker), this.options);
  }

  editMarker(marker): Observable<any> {
    return this.http.put(`/api/map/marker/${marker._id}`, JSON.stringify(marker), this.options);
  }

  deleteMarker(marker): Observable<any> {
    return this.http.delete(`/api/map/marker/${marker._id}`, this.options);
  }

  getDGSearchData(search: {page: number, pageSize: number, what: string, point: {lat: number, lng: number}, key: string}) {
    return this.http.get(`http://catalog.api.2gis.ru/2.0/search?page=${search.page}&page_size=${search.pageSize}&what=${encodeURIComponent(search.what)}&point=${search.point.lng},${search.point.lat}&radius=1000&type=filial&lang=ru&key=${search.key}`).map(res => res.json()); // lint-disable-line
  }

}
