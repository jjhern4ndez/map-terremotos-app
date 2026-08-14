import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
  effect,
  inject
} from '@angular/core';
import type { FeatureCollection, Point } from 'geojson';

import { EarthquakeMapStore } from '../../earthquake-map.store';
import { EarthquakeFeature } from '@models/earthquake.model';

import { GeoJSONSource, Map, NavigationControl } from 'maplibre-gl';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapComponent implements AfterViewInit, OnDestroy {
  @ViewChild('map') private mapContainer!: ElementRef<HTMLDivElement>;

  map!: Map;
  readonly store = inject(EarthquakeMapStore);

  /**
   * Constructor de la clase.
   *
   * @memberof MapComponent
   */
  constructor() {
    // Efecto para actualizar la lista de los terremotos con formato GeoJSON
    effect(() => {
      const features = this.store.earthquakes();
      const selectedId = this.store.selectedEarthquakeId();
      const hoveredId = this.store.hoveredEarthquakeId();
      const source = this.map?.getSource('earthquakes') as GeoJSONSource | undefined;

      if (source) {
        source.setData(this.toGeoJson(features, selectedId, hoveredId));
      }
    });

    // Efecto para cuando se hace click sobre un terremoto en la lista
    effect(() => {
      const coordinates = this.store.flyToRequest();

      if (!coordinates || !this.map) {
        return;
      }

      this.map.flyTo({
        center: [coordinates[0], coordinates[1]],
        essential: true,
        duration: 1000,
      });
    });

    // Efecto para cuando se ubica el cursor (hover) sobre un registro en la lista
    effect(() => {
      const hovered = this.store.hoveredEarthquake();

      if (!hovered || !this.map) {
        return;
      }

      const [lng, lat] = hovered.geometry.coordinates;

      this.map.easeTo({
        center: [lng, lat],
        duration: 400,
        essential: true,
      });
    });
  }

  /**
   * AfterViewInit del componente.
   *
   * @memberof MapComponent
   */
  ngAfterViewInit(): void {
    this.map = new Map({
      container: this.mapContainer.nativeElement,
      style: 'https://demotiles.maplibre.org/style.json',
      center: [-74.0721, 4.7110],
      zoom: 3
    });

    this.map.addControl(new NavigationControl(), 'bottom-right');

    this.map.on('load', () => {
      this.map.addSource('earthquakes', {
        type: 'geojson',
        data: this.toGeoJson(this.store.earthquakes(), this.store.selectedEarthquakeId(), this.store.hoveredEarthquakeId()),
      });

      this.map.addLayer({
        id: 'earthquakes',
        type: 'circle',
        source: 'earthquakes',
        paint: {
          'circle-radius': [
            'case',
            ['any', ['get', 'selected'], ['get', 'hovered']],
            8,
            6,
          ],
          'circle-color': [
            'case',
            ['get', 'selected'],
            '#ef4444',
            ['get', 'hovered'],
            '#3b82f6',
            '#9ca3af',
          ],
          'circle-stroke-width': 1,
          'circle-stroke-color': '#ffffff',
        },
      });

      this.map.on('click', 'earthquakes', (event) => {
        const feature = event.features?.[0];

        if (!feature) {
          return;
        }

        const id = feature.properties?.['id'] as string | undefined;

        if (!id) {
          return;
        }

        this.store.selectEarthquake(id);
      });

      this.map.on('mouseenter', 'earthquakes', () => {
        this.map.getCanvas().style.cursor = 'pointer';
      });

      this.map.on('mouseleave', 'earthquakes', () => {
        this.map.getCanvas().style.cursor = '';
      });
    });
  }

  /**
   * OnDestroy del componente.
   *
   * @memberof MapComponent
   */
  ngOnDestroy(): void {
    this.map?.remove();
  }

  /**
   * Convierte un array de features en un GeoJSON.
   *
   * @private
   * @param {EarthquakeFeature[]} features Datos de terremotos
   * @param {(string | null)} selectedId Id del terremoto seleccionado
   * @param {(string | null)} hoveredId Id del terremoto en hover
   * @return {FeatureCollection}
   * @memberof MapComponent
   */
  private toGeoJson(
    features: EarthquakeFeature[],
    selectedId: string | null,
    hoveredId: string | null,
  ): FeatureCollection {
    return {
      type: 'FeatureCollection',
      features: features.map(({ id, geometry, properties }) => ({
        type: 'Feature',
        geometry: geometry as Point,
        properties: {
          ...properties,
          id,
          selected: id === selectedId,
          hovered: id === hoveredId,
        },
      })),
    };
  }
}
