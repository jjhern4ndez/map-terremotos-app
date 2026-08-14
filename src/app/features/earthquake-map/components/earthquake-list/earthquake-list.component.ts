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

  magClass(mag: number): string {
    if (mag >= 5) return 'bg-red-600';
    if (mag >= 4.5) return 'bg-orange-500';
    if (mag >= 2.5) return 'bg-amber-400';
    return 'bg-emerald-500';
  }

  depth(coordinates: number[]): number {
    return coordinates[2] ?? 0;
  }

  select(quake: EarthquakeFeature): void {
    this.store.selectEarthquake(quake.id);
    this.store.flyToEarthquake(quake.id);
  }

  onMouseEnter(quake: EarthquakeFeature): void {
    this.clearHoverTimer();

    this.hoverTimer = setTimeout(() => {
      this.store.hoverEarthquake(quake.id);
    }, 1000);
  }

  onMouseLeave(): void {
    this.clearHoverTimer();
    this.store.hoverEarthquake(null);
  }

  ngOnDestroy(): void {
    this.clearHoverTimer();
  }

  private clearHoverTimer(): void {
    if (this.hoverTimer) {
      clearTimeout(this.hoverTimer);
      this.hoverTimer = null;
    }
  }
}
