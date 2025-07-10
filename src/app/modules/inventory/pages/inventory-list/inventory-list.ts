import { Component, OnInit, computed, signal } from '@angular/core';
import { InventoryService } from '../../services/inventory.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Inventory } from '../../models/inventory.model';
import { Router } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-inventory-list',
  templateUrl: './inventory-list.html',
  styleUrls: ['./inventory-list.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(10px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'none' })),
      ]),
    ])
  ]
})
export class InventoryList implements OnInit {
  inventory = signal<Inventory[]>([]);
  loading = signal<boolean>(true);
  error = signal<string>('');
  searchTerm = signal<string>('');

  readonly API_BASE_URL = environment.apiUrl;

  constructor(
    private inventoryService: InventoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchInventories();
  }

  fetchInventories(): void {
    this.loading.set(true);
    this.error.set('');

    this.inventoryService.getInventories().subscribe({
      next: (data) => {
        this.inventory.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Error al cargar el inventario');
        this.loading.set(false);
      },
    });
  }

  filteredInventory = computed(() => {
    const term = this.searchTerm().toLowerCase();
    return this.inventory().filter((i) =>
      i.input?.name.toLowerCase().includes(term) ||
      i.warehouse?.name.toLowerCase().includes(term) ||
      i.user?.name.toLowerCase().includes(term)
    );
  });

  goToInventory(id: number): void {
    this.router.navigate(['/inventory', id]);
  }

  goToAddInventory(): void {
    this.router.navigate(['/inventory/create']);
  }
}
