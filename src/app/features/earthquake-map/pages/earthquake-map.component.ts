import { MapComponent } from '../components/map/map.component';
import { EarthquakeMapStore } from '../earthquake-map.store';
import { EarthquakeListComponent } from '../components/earthquake-list/earthquake-list.component';
import { EarthquakeCardComponent } from '../components/earthquake-card/earthquake-card.component';
import { Component, inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-earthquake-map',
  standalone: true,
  imports: [
    MapComponent,
    EarthquakeListComponent,
    EarthquakeCardComponent
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
