import { ShoppingTableState } from './shopping-list.types';

export const getNextNumericId = <T extends { id: string }>(records: T[]) => {
  const maxId = records.reduce((highestValue, record) => {
    const parsedId = Number.parseInt(record.id, 10);
    return Number.isNaN(parsedId) ? highestValue : Math.max(highestValue, parsedId);
  }, 0);

  return (maxId + 1).toString();
};

export const createSkeletonTable = (tableId: string): ShoppingTableState => ({
  id: tableId,
  title: '',
  rows: [{ id: '1', name: '', priority: '' }],
  isEditing: true,
  editingRowId: null,
});

export const createInitialTables = (): ShoppingTableState[] => [
  {
    id: '1',
    title: 'Shopping List',
    rows: [
      { id: '1', name: 'Milk', priority: '10' },
      { id: '2', name: 'Bread', priority: '5' },
      { id: '3', name: 'Eggs', priority: '7' },
    ],
    isEditing: false,
    editingRowId: null,
  },
];
