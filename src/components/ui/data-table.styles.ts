import { StyleSheet } from 'react-native';

import { Spacing } from '@/constants/theme';

export const styles = StyleSheet.create({
  // Outer card wrapping the title header + table
  card: {
    borderRadius: Spacing.two,
    borderWidth: 1,
    overflow: 'hidden',
    alignSelf: 'flex-start',
    minWidth: 200,
    maxWidth: 480,
    width: '100%',
  },
  // Non-interactive title bar at the top of the card
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.two,
    paddingVertical: Spacing.one,
  },
  // Inner table — no outer border when inside a card
  tableContainer: {
    borderRadius: Spacing.two,
    borderWidth: 1,
    overflow: 'hidden',
    alignSelf: 'flex-start',
    minWidth: 200,
    maxWidth: 480,
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    paddingHorizontal: Spacing.two,
    paddingVertical: Spacing.one,
    borderBottomWidth: 1,
  },
  headerRow: {
    paddingVertical: Spacing.two,
  },
  dataRow: {
    minHeight: 32,
  },
  pressedRow: {
    opacity: 0.7,
  },
  cell: {
    flex: 1,
    justifyContent: 'center',
  },
  actionButton: {
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  emptyContainer: {
    paddingVertical: Spacing.three,
    paddingHorizontal: Spacing.two,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
