import React from 'react';
import { Pressable, View } from 'react-native';

import { ThemedText } from '@/components/theme/themed-text';
import { ThemedView } from '@/components/theme/themed-view';
import { useTheme } from '@/hooks/use-theme';

import { styles } from './data-table.styles';

export interface Column<T> {
  key: keyof T;
  label: string;
  width?: number | string;
  render?: (value: T[keyof T], row: T, index: number) => React.ReactNode;
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  title?: string;
  keyExtractor?: (item: T, index: number) => string;
  onRowPress?: (row: T, index: number) => void;
  actions?: {
    label: string;
    onPress: (row: T, index: number) => void;
  }[];
  emptyMessage?: string;
}

export function DataTable<T extends object>({
  data,
  columns,
  title,
  keyExtractor = (_, index) => index.toString(),
  onRowPress,
  actions,
  emptyMessage = 'No data available.',
}: DataTableProps<T>) {
  const theme = useTheme();

  const borderStyle = { borderColor: theme.backgroundSelected };

  const tableContent =
    data.length === 0 ? (
      <ThemedView style={styles.emptyContainer}>
        <ThemedText themeColor="textSecondary">{emptyMessage}</ThemedText>
      </ThemedView>
    ) : (
      <>
        {/* Header Row */}
        <ThemedView
          type="backgroundElement"
          style={[styles.row, styles.headerRow, borderStyle]}>
          {columns.map((column) => (
            <View key={String(column.key)} style={[styles.cell, { flex: column.width ? 0 : 1 }]}>
              <ThemedText type="small">{column.label}</ThemedText>
            </View>
          ))}
          {actions && actions.length > 0 && (
            <View style={[styles.cell, { width: 56 }]}>
              <ThemedText type="small">Actions</ThemedText>
            </View>
          )}
        </ThemedView>

        {/* Data Rows */}
        {data.map((row, rowIndex) => (
          <Pressable
            key={keyExtractor(row, rowIndex)}
            onPress={() => onRowPress?.(row, rowIndex)}
            style={({ pressed }) => [styles.row, styles.dataRow, borderStyle, pressed && styles.pressedRow]}>
            {columns.map((column) => {
              const value = row[column.key];
              const cellContent = column.render ? column.render(value, row, rowIndex) : value;

              return (
                <View
                  key={String(column.key)}
                  style={[
                    styles.cell,
                    column.width ? { width: column.width as number } : { flex: 1 },
                  ]}>
                  <ThemedText type="small" numberOfLines={2}>{cellContent as React.ReactNode}</ThemedText>
                </View>
              );
            })}

            {/* Action Buttons */}
            {actions && actions.length > 0 && (
              <View style={[styles.cell, { width: 56, alignItems: 'flex-end' }]}>
                {actions.map((action, actionIndex) => (
                  <Pressable
                    key={actionIndex}
                    onPress={() => action.onPress(row, rowIndex)}
                    style={({ pressed }) => [
                      styles.actionButton,
                      { backgroundColor: theme.backgroundSelected, opacity: pressed ? 0.7 : 1 },
                    ]}>
                    <ThemedText type="small">{action.label}</ThemedText>
                  </Pressable>
                ))}
              </View>
            )}
          </Pressable>
        ))}
      </>
    );

  // Bare table (no title)
  if (!title) {
    return (
      <ThemedView style={[styles.tableContainer, borderStyle]}>
        {tableContent}
      </ThemedView>
    );
  }

  // Card with title header
  return (
    <ThemedView type="backgroundElement" style={[styles.card, borderStyle]}>
      <View style={styles.titleRow}>
        <ThemedText type="default">{title}</ThemedText>
      </View>

      <ThemedView style={[styles.tableContainer, borderStyle]}>
        {tableContent}
      </ThemedView>
    </ThemedView>
  );
}
