  import {
    AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
  inject
} from '@angular/core';

import { EarthquakeMapStore } from '../../earthquake-map.store';

import { Map, Marker, NavigationControl } from 'maplibre-gl';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styles: [
    `
      .map-container {
        width: 100%;
        height: 500px;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapComponent implements AfterViewInit, OnDestroy {
  @ViewChild('map') private mapContainer!: ElementRef<HTMLDivElement>;

  map!: Map;

  ngAfterViewInit(): void {
    this.map = new Map({
      container: this.mapContainer.nativeElement,
      style: 'https://demotiles.maplibre.org/style.json',
      center: [-74.0721, 4.7110],
      zoom: 4,
    });

    this.map.addControl(new NavigationControl(), 'top-right');

    new Marker()
      .setLngLat([-74.0721, 4.7110])
      .addTo(this.map);
  }

  ngOnDestroy(): void {
    this.map?.remove();
  }
}
