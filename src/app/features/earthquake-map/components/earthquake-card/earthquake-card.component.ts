import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { DatePipe, DecimalPipe, NgClass } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { animate, style, transition, trigger } from '@angular/animations';

import { EarthquakeFeature } from '@models/earthquake.model';

@Component({
  selector: 'app-earthquake-card',
  standalone: true,
  imports: [DatePipe, DecimalPipe, MatIconModule, NgClass],
  templateUrl: './earthquake-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('cardAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-20px) scale(0.95)' }),
        animate(
          '240ms 160ms cubic-bezier(0.16, 1, 0.3, 1)',
          style({ opacity: 1, transform: 'translateY(0) scale(1)' }),
        ),
      ]),
      transition(':leave', [
        animate(
          '160ms cubic-bezier(0.4, 0, 1, 1)',
          style({ opacity: 0, transform: 'translateY(16px) scale(0.50)' }),
        ),
      ]),
    ]),
  ],
  host: {
    class: 'absolute bottom-4 left-4 z-10 block w-80 max-w-[calc(100vw-2rem)] overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black/10',
    '[@cardAnimation]': '',
  },
})
export class EarthquakeCardComponent {
  @Input({ required: true }) earthquake!: EarthquakeFeature;
  @Output() close = new EventEmitter<void>();

  /**
   * Obtiene el color de la clase de Tailwind según la magnitud del terremoto.
   *
   * @param {number} mag Magnitud del terremoto
   * @param {boolean} [isText=false] Indica si se desea obtener el color de fondo o de texto
   * @return {string}
   * @memberof EarthquakeCardComponent
   */
  magnitudeClass(mag: number, isText = false): string {
    let prefix = isText ? 'text' : 'bg';

    if (mag >= 5) return `${prefix}-red-600`;
    if (mag >= 4.5) return `${prefix}-orange-500`;
    if (mag >= 2.5) return `${prefix}-amber-400`;

    return `${prefix}-emerald-500`;
  }

}
