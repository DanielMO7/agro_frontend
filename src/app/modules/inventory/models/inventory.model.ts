export interface Inventory {
  id: number;
  input_id: number;
  warehouse_id: number;
  user_id: number;
  is_input: boolean;
  amount: string;
  created_at: string;
  updated_at: string;

  // Relaciones
  input?: Input;
  warehouse?: Warehouse;
  user?: User;
}

export interface Input {
  id: number;
  name: string;
  reference: string;
  state: string;
  date_purchase: string;
  created_at: string;
  updated_at: string;
}

export interface Warehouse {
  id: number;
  name: string;
  reference: string;
  created_at: string;
  updated_at: string;
}

export interface User {
  id: number;
  name: string;
  mail: string;
  identification: string;
  cargo: string;
  phone?: string;
  is_admin: boolean;
}
