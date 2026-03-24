import { SymbolView } from 'expo-symbols';
import React from 'react';
import { Pressable, TextInput, View } from 'react-native';

import { ThemedText } from '@/components/theme/themed-text';
import { ThemedView } from '@/components/theme/themed-view';
import { useTheme } from '@/hooks/use-theme';

import { styles } from './data-table.styles';

export interface Column<T> {
  key: keyof T;
  label: string;
  width?: number | string;
  render?: (value: T[keyof T], row: T, index: number) => React.ReactNode;
  editable?: boolean;
  editPlaceholder?: string;
  onLabelChange?: (nextLabel: string) => void;
  labelPlaceholder?: string;
}

export interface EditableDataTableConfig<T> {
  isEditing: boolean;
  onToggleEditing: () => void;
  onCellChange?: (row: T, index: number, columnKey: keyof T, value: string) => void;
  onAddRow?: () => void;
  onDeleteTable?: () => void;
  showAddRowWhenView?: boolean;
  addRowLabel?: string;
}

export interface DataTableAction<T> {
  label: string | ((row: T, index: number) => string);
  onPress: (row: T, index: number) => void;
  isVisible?: (row: T, index: number) => boolean;
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  title?: string;
  onTitleChange?: (nextTitle: string) => void;
  titlePlaceholder?: string;
  keyExtractor?: (item: T, index: number) => string;
  onRowPress?: (row: T, index: number) => void;
  actions?: DataTableAction<T>[];
  emptyMessage?: string;
  editable?: EditableDataTableConfig<T>;
}

export function DataTable<T extends object>({
  data,
  columns,
  title,
  onTitleChange,
  titlePlaceholder = 'Table title',
  keyExtractor = (_, index) => index.toString(),
  onRowPress,
  actions,
  emptyMessage = 'No data available.',
  editable,
}: DataTableProps<T>) {
  const theme = useTheme();

  const borderStyle = { borderColor: theme.backgroundSelected };
  const isEditing = editable?.isEditing ?? false;
  const hasCardHeader = Boolean(title) || Boolean(editable);
  const actionsColumnWidth = actions && actions.length > 1 ? 112 : 64;

  const renderCellContent = (content: React.ReactNode) => {
    if (typeof content === 'string' || typeof content === 'number' || typeof content === 'boolean') {
      return <ThemedText type="small" numberOfLines={2}>{String(content)}</ThemedText>;
    }

    if (content == null) {
      return <ThemedText type="small" numberOfLines={2} />;
    }

    return content;
  };

  const renderTitle = () => {
    if (isEditing && onTitleChange) {
      return (
        <TextInput
          value={title ?? ''}
          onChangeText={onTitleChange}
          placeholder={titlePlaceholder}
          placeholderTextColor={theme.textSecondary}
          style={[
            styles.titleInput,
            {
              color: theme.text,
              borderColor: theme.backgroundSelected,
            },
          ]}
        />
      );
    }

    return (
      <ThemedText type="default" style={styles.titleText}>
        {title || 'Untitled Table'}
      </ThemedText>
    );
  };

  const renderEditToggleIcon = () => {
    if (!editable) {
      return null;
    }

    return (
      <Pressable
        onPress={editable.onToggleEditing}
        style={({ pressed }) => [
          styles.iconButton,
          {
            backgroundColor: isEditing ? theme.backgroundSelected : theme.backgroundElement,
            opacity: pressed ? 0.7 : 1,
          },
        ]}>
        <SymbolView
          name={
            isEditing
              ? { ios: 'checkmark', android: 'check', web: 'check' }
              : { ios: 'pencil', android: 'edit', web: 'edit' }
          }
          size={12}
          tintColor={theme.text}
          weight="regular"
        />
      </Pressable>
    );
  };

  const renderDeleteTableIcon = () => {
    if (!editable?.onDeleteTable || !isEditing) {
      return null;
    }

    return (
      <Pressable
        onPress={editable.onDeleteTable}
        style={({ pressed }) => [
          styles.iconButton,
          {
            backgroundColor: theme.backgroundElement,
            opacity: pressed ? 0.7 : 1,
          },
        ]}>
        <SymbolView
          name={{ ios: 'trash', android: 'delete', web: 'delete' }}
          size={12}
          tintColor={theme.text}
          weight="regular"
        />
      </Pressable>
    );
  };

  const renderHeaderCell = (column: Column<T>) => {
    if (isEditing && column.onLabelChange) {
      return (
        <TextInput
          value={column.label}
          onChangeText={column.onLabelChange}
          placeholder={column.labelPlaceholder ?? 'Column'}
          placeholderTextColor={theme.textSecondary}
          style={[
            styles.headerInput,
            {
              color: theme.text,
              borderColor: theme.backgroundSelected,
            },
          ]}
        />
      );
    }

    return (
      <ThemedText type="small">{column.label || column.labelPlaceholder || String(column.key)}</ThemedText>
    );
  };

  const renderDataCell = (column: Column<T>, row: T, rowIndex: number) => {
    const value = row[column.key];
    const isColumnEditable = column.editable ?? true;
    const onCellChange = editable?.onCellChange;

    if (isEditing && onCellChange && isColumnEditable) {
      return (
        <TextInput
          value={value == null ? '' : String(value)}
          onChangeText={(nextValue) => onCellChange(row, rowIndex, column.key, nextValue)}
          placeholder={column.editPlaceholder ?? column.label}
          placeholderTextColor={theme.textSecondary}
          style={[
            styles.cellInput,
            {
              color: theme.text,
              borderColor: theme.backgroundSelected,
            },
          ]}
        />
      );
    }

    const cellContent = column.render ? column.render(value, row, rowIndex) : value;

    return renderCellContent(cellContent as React.ReactNode);
  };

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
              {renderHeaderCell(column)}
            </View>
          ))}
          {actions && actions.length > 0 && (
            <View style={[styles.cell, { width: actionsColumnWidth }]}>
              <ThemedText type="small">Actions</ThemedText>
            </View>
          )}
        </ThemedView>

        {/* Data Rows */}
        {data.map((row, rowIndex) => {
          const rowActions = actions?.filter((action) =>
            action.isVisible ? action.isVisible(row, rowIndex) : true,
          ) ?? [];

          return (
            <Pressable
              key={keyExtractor(row, rowIndex)}
              onPress={isEditing ? undefined : () => onRowPress?.(row, rowIndex)}
              style={({ pressed }) => [
                styles.row,
                styles.dataRow,
                borderStyle,
                !isEditing && pressed && styles.pressedRow,
              ]}>
              {columns.map((column) => {
                return (
                  <View
                    key={String(column.key)}
                    style={[
                      styles.cell,
                      column.width ? { width: column.width as number } : { flex: 1 },
                    ]}>
                    {renderDataCell(column, row, rowIndex)}
                  </View>
                );
              })}

              {/* Action Buttons */}
              {rowActions.length > 0 && (
                <View style={[styles.cell, { width: actionsColumnWidth, alignItems: 'flex-end' }]}>
                  {rowActions.map((action, actionIndex) => {
                    const actionLabel =
                      typeof action.label === 'function' ? action.label(row, rowIndex) : action.label;

                    if (!actionLabel) {
                      return null;
                    }

                    return (
                      <Pressable
                        key={`${actionIndex}-${actionLabel}`}
                        onPress={() => action.onPress(row, rowIndex)}
                        style={({ pressed }) => [
                          styles.actionButton,
                          { backgroundColor: theme.backgroundSelected, opacity: pressed ? 0.7 : 1 },
                        ]}>
                        <ThemedText type="small">{actionLabel}</ThemedText>
                      </Pressable>
                    );
                  })}
                </View>
              )}
            </Pressable>
          );
        })}
      </>
    );

  // Bare table (no title)
  if (!hasCardHeader) {
    return (
      <ThemedView style={[styles.tableContainer, borderStyle]}>
        {tableContent}
      </ThemedView>
    );
  }

  // Card with title header
  return (
    <ThemedView
      type="backgroundElement"
      style={[styles.card, borderStyle, isEditing && styles.editingCard]}>
      <View style={styles.titleRow}>
        <View style={styles.titleLeading}>
          {renderTitle()}
          {renderEditToggleIcon()}
          {renderDeleteTableIcon()}
        </View>

        {editable?.onAddRow && (isEditing || editable.showAddRowWhenView) && (
          <View style={styles.titleActions}>
            <Pressable
              onPress={editable.onAddRow}
              style={({ pressed }) => [
                styles.controlButton,
                {
                  backgroundColor: theme.backgroundElement,
                  opacity: pressed ? 0.7 : 1,
                },
              ]}>
              <ThemedText type="small">{editable.addRowLabel ?? '+ Row'}</ThemedText>
            </Pressable>
          </View>
        )}
      </View>

      <ThemedView style={[styles.tableContainer, borderStyle]}>
        {tableContent}
      </ThemedView>
    </ThemedView>
  );
}
