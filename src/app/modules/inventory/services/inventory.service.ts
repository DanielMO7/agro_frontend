import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Inventory, Input, Warehouse, User } from '../models/inventory.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class InventoryService {
  private apiUrl = environment.apiUrl + '/api/v1/inventories';

  constructor(private http: HttpClient) {}

  getInventories(): Observable<Inventory[]> {
    return this.http.get<Inventory[]>(this.apiUrl);
  }

  getInventoryById(id: number): Observable<Inventory> {
    return this.http.get<Inventory>(`${this.apiUrl}/${id}`);
  }

  createInventory(inventory: Inventory): Observable<Inventory> {
    return this.http.post<Inventory>(this.apiUrl, inventory);
  }

  updateInventory(id: number, inventory: Inventory): Observable<Inventory> {
    return this.http.put<Inventory>(`${this.apiUrl}/${id}`, inventory);
  }

  deleteInventory(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }


  getInputs(): Observable<Input[]> {
    return this.http.get<Input[]>(environment.apiUrl + '/api/v1/inputs');
  }

  getWarehouses(): Observable<Warehouse[]> {
    return this.http.get<Warehouse[]>(environment.apiUrl + '/api/v1/warehouses');
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(environment.apiUrl + '/api/v1/users');
  }
}
