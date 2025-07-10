import { Routes } from '@angular/router';
import { InventoryList } from '../pages/inventory-list/inventory-list';
import { InventoryDetail } from '../pages/inventory-detail/inventory-detail';
import { InventoryForm } from '../pages/inventory-form/inventory-form';

export const INVENTORY_ROUTES: Routes = [
  { path: '', component: InventoryList },
  { path: 'create', component: InventoryForm },
  { path: ':id', component: InventoryDetail },
  { path: ':id/edit', component: InventoryForm },
];
