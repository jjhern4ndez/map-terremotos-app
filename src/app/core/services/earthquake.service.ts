import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataCollection } from '../models/earthquake.model';

@Injectable({providedIn: 'root'})
export class EarthquakeService {
  constructor(
    private _http: HttpClient
  ) { }

  getEarthquakes(): Observable<DataCollection> {
    return this._http.get<DataCollection>('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson');
  }
}
