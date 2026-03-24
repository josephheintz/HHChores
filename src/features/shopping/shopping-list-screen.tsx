import React, { useState } from 'react';
import { Pressable, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/theme/themed-text';
import { ThemedView } from '@/components/theme/themed-view';
import { DataTable } from '@/components/ui/data-table';
import { useTheme } from '@/hooks/use-theme';

import { createInitialTables, createSkeletonTable, getNextNumericId } from './shopping-list.helpers';
import { styles } from './shopping-list.styles';
import { ShoppingTableState } from './shopping-list.types';

export default function ShopListScreen() {
  const theme = useTheme();
  const [tables, setTables] = useState<ShoppingTableState[]>(createInitialTables);

  const addTable = () => {
    setTables((prevTables) => [...prevTables, createSkeletonTable(getNextNumericId(prevTables))]);
  };

  const updateTable = (tableId: string, updates: Partial<ShoppingTableState>) => {
    setTables((prevTables) =>
      prevTables.map((t) => (t.id === tableId ? { ...t, ...updates } : t)),
    );
  };

  const updateRow = (tableId: string, rowId: string, field: 'name' | 'priority', value: string) => {
    setTables((prevTables) =>
      prevTables.map((t) =>
        t.id === tableId
          ? { ...t, rows: t.rows.map((r) => (r.id === rowId ? { ...r, [field]: value } : r)) }
          : t,
      ),
    );
  };

  const addRow = (tableId: string) => {
    setTables((prevTables) =>
      prevTables.map((t) =>
        t.id === tableId
          ? (() => {
              const nextRowId = getNextNumericId(t.rows);

              return {
                ...t,
                rows: [...t.rows, { id: nextRowId, name: '', priority: '' }],
                editingRowId: nextRowId,
              };
            })()
          : t,
      ),
    );
  };

  const removeRow = (tableId: string, rowId: string) => {
    setTables((prevTables) =>
      prevTables.map((t) =>
        t.id === tableId
          ? {
              ...t,
              rows: t.rows.filter((r) => r.id !== rowId),
              editingRowId: t.editingRowId === rowId ? null : t.editingRowId,
            }
          : t,
      ),
    );
  };

  const doneEditingRow = (tableId: string, rowId: string) => {
    setTables((prevTables) =>
      prevTables.map((t) =>
        t.id === tableId && t.editingRowId === rowId ? { ...t, editingRowId: null } : t,
      ),
    );
  };

  const removeTable = (tableId: string) => {
    setTables((prevTables) => prevTables.filter((table) => table.id !== tableId));
  };

  return (
    <ThemedView style={styles.screen}>
      <SafeAreaView style={styles.container}>
        <ThemedText type="subtitle" style={styles.pageTitle}>List Maker</ThemedText>

        <Pressable
          onPress={addTable}
          style={({ pressed }) => [
            styles.addButton,
            { backgroundColor: theme.backgroundElement, opacity: pressed ? 0.7 : 1 },
          ]}>
          <ThemedText>Add Table</ThemedText>
        </Pressable>

        {tables.map((table) => (
          <DataTable
            key={table.id}
            data={table.rows}
            title={table.title}
            onTitleChange={(nextTitle) => updateTable(table.id, { title: nextTitle })}
            titlePlaceholder="Table title"
            columns={[
              {
                key: 'name',
                label: 'Item',
                editable: false,
                editPlaceholder: 'Item',
                render: (_, row) =>
                  table.editingRowId === row.id ? (
                    <TextInput
                      value={row.name}
                      onChangeText={(value) => updateRow(table.id, row.id, 'name', value)}
                      placeholder="Item"
                      placeholderTextColor={theme.textSecondary}
                      style={[
                        styles.rowInput,
                        {
                          color: theme.text,
                          borderColor: theme.backgroundSelected,
                        },
                      ]}
                    />
                  ) : (
                    row.name || '-'
                  ),
              },
              {
                key: 'priority',
                label: 'Priority',
                editable: false,
                editPlaceholder: 'Priority',
                render: (_, row) =>
                  table.editingRowId === row.id ? (
                    <TextInput
                      value={row.priority}
                      onChangeText={(value) => updateRow(table.id, row.id, 'priority', value)}
                      placeholder="Priority"
                      placeholderTextColor={theme.textSecondary}
                      style={[
                        styles.rowInput,
                        {
                          color: theme.text,
                          borderColor: theme.backgroundSelected,
                        },
                      ]}
                    />
                  ) : (
                    row.priority || '-'
                  ),
              },
            ]}
            keyExtractor={(item) => item.id}
            emptyMessage="No rows yet."
            editable={{
              isEditing: table.isEditing,
              onToggleEditing: () => updateTable(table.id, { isEditing: !table.isEditing }),
              onAddRow: () => addRow(table.id),
              onDeleteTable: () => removeTable(table.id),
              showAddRowWhenView: true,
              addRowLabel: '+ Item',
            }}
            actions={[
              {
                label: 'Done',
                onPress: (item) => doneEditingRow(table.id, item.id),
                isVisible: (item) => table.editingRowId === item.id,
              },
              {
                label: 'Remove',
                onPress: (item) => removeRow(table.id, item.id),
              },
            ]}
          />
        ))}
      </SafeAreaView>
    </ThemedView>
  );
}
