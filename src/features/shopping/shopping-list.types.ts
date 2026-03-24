export interface ShoppingItem {
  id: string;
  name: string;
  priority: string;
}

export interface ShoppingTableState {
  id: string;
  title: string;
  rows: ShoppingItem[];
  isEditing: boolean;
  editingRowId: string | null;
}
