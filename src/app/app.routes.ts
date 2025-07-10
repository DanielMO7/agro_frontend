import { Routes } from '@angular/router';
import { MainLayout } from './layout/main-layout/main-layout';
import { authGuard } from './modules/auth/guards/auth.guard';
import { loginGuard } from './modules/auth/guards/login.guard';

export const routes: Routes = [
  {
    path: 'login',
    canActivate: [loginGuard],
    loadChildren: () =>
      import('./modules/auth/routes/auth.routes').then((m) => m.AUTH_ROUTES),
  },
  {
    path: '',
    canActivate: [authGuard],
    component: MainLayout,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./modules/dashboard/pages/home/home').then(
            (m) => m.Home
          ),
      },
      {
        path: 'inventorys',
        loadChildren: () =>
        import('./modules/inventory/routes/inventory.routes').then((m) => m.INVENTORY_ROUTES),
      },
      {
        path: '',
        redirectTo: '',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
