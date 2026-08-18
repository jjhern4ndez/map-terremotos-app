import { Routes } from "@angular/router";
import { EarthquakeMapStore } from "./earthquake-map.store";

export const routes: Routes = [
  {
    path: '',
    title: 'Visor Geográfico de Terremotos',
    providers:[
      EarthquakeMapStore
    ],
    loadComponent: () => import('./pages/earthquake-map.component').then(m => m.EarthquakeMapComponent)
  }
];
