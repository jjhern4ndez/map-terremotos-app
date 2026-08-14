import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DataCollection } from '@models/earthquake.model';
import { inject, Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class EarthquakeService {

  private readonly _http = inject(HttpClient);
  private readonly _url = 'https://earthquake.usgs.gov';
  private readonly _alternativeUrl = '/fdsnws/event/1/query?format=geojson&starttime=2026-07-15&endtime=2026-08-14&limit=100&orderby=time';

  /**
   * Obtiene la información de los terremotos.
   *
   * @return {Observable<DataCollection>}
   * @memberof EarthquakeService
   */
  getEarthquakes(): Observable<DataCollection> {
    return this._http.get<DataCollection>(this._url + '/earthquakes/feed/v1.0/summary/all_month.geojson');
  }
}
