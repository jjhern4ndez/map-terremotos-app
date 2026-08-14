import { Injectable, computed, inject, signal } from '@angular/core';

import { EarthquakeService } from '@services/earthquake.service';
import { EarthquakeFeature } from '@models/earthquake.model';

@Injectable()
export class EarthquakeMapStore {

  private readonly earthquakeService = inject(EarthquakeService);

  /**
   * Estados principales
   */
  private readonly _earthquakes = signal<EarthquakeFeature[]>([]);

  private readonly _responseGeoJson = signal<any>([]);

  private readonly _selectedEarthquakeId = signal<string | null>(null);

  private readonly _hoveredEarthquakeId = signal<string | null>(null);

  private readonly _loading = signal(false);

  private readonly _error = signal<string | null>(null);

  private readonly _flyToRequest = signal<number[] | null>(null);

  /**
   * Getters
   */
  readonly earthquakes = this._earthquakes.asReadonly();

  readonly responseGeoJson = this._responseGeoJson.asReadonly();

  readonly selectedEarthquakeId = this._selectedEarthquakeId.asReadonly();

  readonly hoveredEarthquakeId = this._hoveredEarthquakeId.asReadonly();

  readonly loading = this._loading.asReadonly();

  readonly error = this._error.asReadonly();

  readonly flyToRequest = this._flyToRequest.asReadonly();

  readonly selectedEarthquake = computed(() => {

    const id = this._selectedEarthquakeId();

    if (!id) return null;

    return this._earthquakes()
      .find(earthquake => earthquake.id === id) ?? null;
  });

  readonly hoveredEarthquake = computed(() => {

    const id = this._hoveredEarthquakeId();

    if (!id) return null;

    return this._earthquakes()
      .find(earthquake => earthquake.id === id) ?? null;
  });

  /**
   * Realiza la carga de los terremotos.
   *
   * @memberof EarthquakeMapStore
   */
  loadEarthquakes(): void {

    // this._loading.set(true);
    // this._error.set(null);

    this.earthquakeService
      .getEarthquakes()
      .subscribe({
        next: response => {

          this._responseGeoJson.set(response);
          this._earthquakes.set(response.features);

          this._loading.set(false);
        },

        error: () => {

          this._error.set('No fue posible cargar los datos de terremotos.');

          this._loading.set(false);
        }
      });
  }

  /**
   * Selecciona un terremoto.
   *
   * @param {string} id
   * @memberof EarthquakeMapStore
   */
  selectEarthquake(id: string): void {
    this._selectedEarthquakeId.set(id);
  }

  /**
   * Ubica un terremoto en el mapa.
   *
   * @param {string} id
   * @memberof EarthquakeMapStore
   */
  flyToEarthquake(id: string): void {

    const earthquake = this._earthquakes()
      .find(item => item.id === id);

    if (!earthquake) return;

    this._flyToRequest.set([...earthquake.geometry.coordinates]);
  }

  /**
   * Coloca el terremoto en hover.
   *
   * @param {(string | null)} id
   * @memberof EarthquakeMapStore
   */
  hoverEarthquake(id: string | null): void {
    this._hoveredEarthquakeId.set(id);
  }

  /**
   * Limpia la selección de terremoto.
   *
   * @memberof EarthquakeMapStore
   */
  clearSelection(): void {
    this._selectedEarthquakeId.set(null);
  }

}
