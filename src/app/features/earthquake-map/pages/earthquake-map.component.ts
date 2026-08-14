import { Component, inject, OnInit } from '@angular/core';
import { EarthquakeMapStore } from '../earthquake-map.store';
import { MapComponent } from '../components/map/map.component';

@Component({
  selector: 'app-earthquake-map',
  standalone: true,
  imports: [
    MapComponent
  ],
  templateUrl: 'earthquake-map.component.html'
})

export class EarthquakeMapComponent implements OnInit {
  readonly store = inject(EarthquakeMapStore);

  constructor() {
    this.store.loadEarthquakes();
  }

  ngOnInit() { }
}
