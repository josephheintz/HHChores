import { StyleSheet } from 'react-native';

import { BottomTabInset, MaxContentWidth, Spacing, TopNavInset } from '@/constants/theme';

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    padding: Spacing.four,
    paddingTop: TopNavInset + Spacing.four,
    paddingBottom: BottomTabInset + Spacing.four,
    gap: Spacing.three,
    maxWidth: MaxContentWidth,
  },
  addButton: {
    borderRadius: Spacing.two,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
  },
  rowInput: {
    borderWidth: 1,
    borderRadius: Spacing.one,
    paddingHorizontal: Spacing.one,
    paddingVertical: Spacing.one,
    minHeight: 28,
  },
  pageTitle: {
    alignSelf: 'flex-start',
  },
});

