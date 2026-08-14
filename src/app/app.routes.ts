import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./features/earthquake-map/earthquake-map.routes').then(m => m.routes)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
