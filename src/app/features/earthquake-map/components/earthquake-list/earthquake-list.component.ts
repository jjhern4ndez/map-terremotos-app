import { ChangeDetectionStrategy, Component, OnDestroy, inject } from '@angular/core';
import { DatePipe, DecimalPipe } from '@angular/common';

import { EarthquakeMapStore } from '../../earthquake-map.store';
import { EarthquakeFeature } from '@models/earthquake.model';

@Component({
  selector: 'app-earthquake-list',
  standalone: true,
  imports: [DatePipe, DecimalPipe],
  templateUrl: './earthquake-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class:
      'flex w-80 max-w-[calc(100vw-2rem)] max-h-[calc(100%-2rem)] flex-col rounded-lg bg-white/90 shadow-lg ring-1 ring-black/5 backdrop-blur',
  },
})
export class EarthquakeListComponent implements OnDestroy {
  readonly store = inject(EarthquakeMapStore);

  private hoverTimer: ReturnType<typeof setTimeout> | null = null;

  /**
   * OnDestroy del componente.
   *
   * @memberof EarthquakeListComponent
   */
  ngOnDestroy(): void {
    this.clearHoverTimer();
  }

  /**
   * Obtiene el color de la clase de Tailwind según la magnitud del terremoto.
   *
   * @param {number} mag Magnitud del terremoto
   * @return {string}
   * @memberof EarthquakeListComponent
   */
  magnitudeClass(mag: number): string {
    if (mag >= 5) return 'bg-red-600';
    if (mag >= 4.5) return 'bg-orange-500';
    if (mag >= 2.5) return 'bg-amber-400';
    return 'bg-emerald-500';
  }

  /**
   * Obtiene el valor de la profundidad del terremoto
   *
   * @param {number[]} coordinates Coordenadas del terremoto
   * @return {number}
   * @memberof EarthquakeListComponent
   */
  depthValue(coordinates: number[]): number {
    return coordinates[2] ?? 0;
  }

  /**
   * Selecciona el terremoto en el mapa.
   *
   * @param {EarthquakeFeature} quake Terremoto
   * @memberof EarthquakeListComponent
   */
  selectEarthquake(quake: EarthquakeFeature): void {
    this.store.selectEarthquake(quake.id);
    this.store.flyToEarthquake(quake.id);
  }

  /**
   * Muestra la información del terremoto al pasar el mouse por encima.
   *
   * @param {EarthquakeFeature} quake Terremoto
   * @memberof EarthquakeListComponent
   */
  onMouseEnter(quake: EarthquakeFeature): void {
    this.clearHoverTimer();

    this.hoverTimer = setTimeout(() => {
      this.store.hoverEarthquake(quake.id);
    }, 1000);
  }

  /**
   * Oculta la información del terremoto al salir el mouse por encima.
   *
   * @memberof EarthquakeListComponent
   */
  onMouseLeave(): void {
    this.clearHoverTimer();
    this.store.hoverEarthquake(null);
  }

  /**
   * Limpia el temporizador de hover.
   *
   * @private
   * @memberof EarthquakeListComponent
   */
  private clearHoverTimer(): void {
    if (this.hoverTimer) {
      clearTimeout(this.hoverTimer);
      this.hoverTimer = null;
    }
  }
}
