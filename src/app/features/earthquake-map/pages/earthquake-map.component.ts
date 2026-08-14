import { MapComponent } from '../components/map/map.component';
import { Component, inject } from '@angular/core';
import { EarthquakeMapStore } from '../earthquake-map.store';
import { EarthquakeListComponent } from '../components/earthquake-list/earthquake-list.component';
import { EarthquakeCardComponent } from '../components/earthquake-card/earthquake-card.component';

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
export class EarthquakeMapComponent {
  readonly store = inject(EarthquakeMapStore);

  /**
   * Constructor de la clase.
   *
   * @memberof EarthquakeMapComponent
   */
  constructor() {
    this.store.loadEarthquakes();
  }

}
