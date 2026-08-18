import { ChangeDetectionStrategy, Component, OnDestroy, inject, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { animate, style, transition, trigger } from '@angular/animations';

import { EarthquakeMapStore } from '../../earthquake-map.store';
import { EarthquakeFeature } from '@models/earthquake.model';

@Component({
  selector: 'app-earthquake-list',
  standalone: true,
  imports: [
    DecimalPipe,
    MatIconModule,
    ScrollingModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './earthquake-list.component.html',
  animations: [
    trigger('collapse', [
      transition(':enter', [
        style({ height: '0', opacity: 0 }),
        animate('600ms cubic-bezier(0.7, 0, 0.2, 1)', style({ height: '*', opacity: 1 })),
      ]),
      transition(':leave', [
        style({ height: '*', opacity: 1 }),
        animate('600ms cubic-bezier(0.7, 0, 0.2, 1)', style({ height: '0', opacity: 0 })),
      ]),
    ]),
  ],
  host: {
    class: 'absolute right-4 top-4 z-10 flex w-90 max-h-[calc(65%-2rem)] flex-col rounded-lg bg-white/90 shadow-lg ring-1 ring-black/5 backdrop-blur',
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
   * Alterna la visibilidad de la lista de terremotos.
   *
   * @memberof EarthquakeListComponent
   */
  toggleList(): void {
    this.store.collapsedList.update(value => !value);
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
   * Identificador único de cada terremoto para el virtual scroll.
   *
   * @param {number} index Índice del elemento
   * @param {EarthquakeFeature} quake Terremoto
   * @return {string}
   * @memberof EarthquakeListComponent
   */
  trackById(index: number, quake: EarthquakeFeature): string {
    return quake.id;
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
