import { Routes } from "@angular/router";
import { EarthquakeMapStore } from "./earthquake-map.store";

export const routes: Routes = [
  {
    path: '',
    providers:[
      EarthquakeMapStore
    ],
    loadComponent: () => import('./pages/earthquake-map.component').then(m => m.EarthquakeMapComponent)
  }
];
