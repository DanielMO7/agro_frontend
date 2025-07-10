import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Inventory } from '../../models/inventory.model';
import { InventoryService } from '../../services/inventory.service';
import { RouterModule } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';
import { Router } from '@angular/router';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-inventory-detail',
  imports: [CommonModule, RouterModule],
  templateUrl: './inventory-detail.html',
  styleUrl: './inventory-detail.scss'
})
export class InventoryDetail {
  inventory = signal<Inventory | null>(null);
  loading = signal(true);
  error = signal('');

  readonly API_BASE_URL = environment.apiUrl;

  constructor(
    private route: ActivatedRoute,
    private inventoryService: InventoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.inventoryService.getInventoryById(id).subscribe({
      next: (data) => {
        this.inventory.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Error al cargar el cliente');
        this.loading.set(false);
        console.error(err);
      }
    });
  }

  goToEditInventory(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.router.navigate(['/customers/'+id+'/edit']);
  }
}
