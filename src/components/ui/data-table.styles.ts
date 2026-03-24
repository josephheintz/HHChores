import { StyleSheet } from 'react-native';

import { Spacing } from '@/constants/theme';

export const styles = StyleSheet.create({
  // Outer card wrapping the title header + table
  card: {
    borderRadius: Spacing.two,
    borderWidth: 1,
    overflow: 'hidden',
    alignSelf: 'flex-start',
    minWidth: 220,
    maxWidth: 560,
    width: '100%',
  },
  editingCard: {
    borderWidth: 2,
  },
  // Non-interactive title bar at the top of the card
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
    paddingHorizontal: Spacing.two,
    paddingVertical: Spacing.one,
  },
  titleLeading: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
  },
  titleText: {
    flexShrink: 1,
    fontSize: 18,
    lineHeight: 26,
    fontWeight: 600,
  },
  titleInput: {
    flex: 1,
    borderWidth: 1,
    borderRadius: Spacing.one,
    paddingHorizontal: Spacing.one,
    paddingVertical: Spacing.one,
    minHeight: 32,
    fontSize: 18,
  },
  titleActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
    marginLeft: 'auto',
  },
  iconButton: {
    borderRadius: Spacing.one,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlButton: {
    borderRadius: Spacing.one,
    paddingHorizontal: Spacing.two,
    paddingVertical: Spacing.one,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Inner table — no outer border when inside a card
  tableContainer: {
    borderRadius: Spacing.two,
    borderWidth: 1,
    overflow: 'hidden',
    alignSelf: 'flex-start',
    minWidth: 220,
    maxWidth: 560,
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
    minHeight: 36,
  },
  pressedRow: {
    opacity: 0.7,
  },
  cell: {
    flex: 1,
    justifyContent: 'center',
  },
  headerInput: {
    borderWidth: 1,
    borderRadius: Spacing.one,
    paddingHorizontal: Spacing.one,
    paddingVertical: Spacing.one,
    minHeight: 28,
  },
  cellInput: {
    borderWidth: 1,
    borderRadius: Spacing.one,
    paddingHorizontal: Spacing.one,
    paddingVertical: Spacing.one,
    minHeight: 28,
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
