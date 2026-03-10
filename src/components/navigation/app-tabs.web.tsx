import {
  TabList,
  TabListProps,
  Tabs,
  TabSlot,
  TabTrigger,
  TabTriggerSlotProps,
} from 'expo-router/ui';
import React from 'react';
import { Pressable, View } from 'react-native';

import { ThemedText } from '@/components/theme/themed-text';
import { tabStyles } from './app-tabs.styles';

export default function AppTabs() {
  return (
    <Tabs>
      <TabSlot style={{ height: '100%' }} />
      <TabList asChild>
        <CustomTabList>
          <TabTrigger name="home" href="/" asChild>
            <Pressable style={({ pressed }) => pressed && { opacity: 0.7 }}>
              <ThemedText type="subtitle">Home</ThemedText>
            </Pressable>
          </TabTrigger>
          <TabTrigger name="shopping" href="/list" asChild>
            <TabButton>Shopping!</TabButton>
          </TabTrigger>
          <TabTrigger name="explore" href="/explore" asChild>
            <TabButton>*Example*</TabButton>
          </TabTrigger>
        </CustomTabList>
      </TabList>
    </Tabs>
  );
}

export function TabButton({ children, isFocused, ...props }: TabTriggerSlotProps) {
  return (
    <Pressable {...props} style={({ pressed }) => pressed && { opacity: 0.7 }}>
      <View className={isFocused ? tabStyles.tabButtonFocused : tabStyles.tabButtonIdle}>
        <ThemedText type="small" themeColor={isFocused ? 'text' : 'textSecondary'}>
          {children}
        </ThemedText>
      </View>
    </Pressable>
  );
}

export function CustomTabList({ children, ...props }: TabListProps) {
  const [isExpanded, setIsExpanded] = React.useState(true);
  const tabs = React.Children.toArray(children);
  const [homeTab, ...rightTabs] = tabs;

  return (
    <View className={tabStyles.dropdownContainer}>
      <View className={tabStyles.tabListContainer} style={{ display: isExpanded ? 'flex' : 'none' }}>
        <View {...props} className={tabStyles.innerContainer}>
          {homeTab}

          <View className={tabStyles.tabsRight}>
            <View className={tabStyles.tabsGroup}>{rightTabs}</View>
          </View>
        </View>
      </View>

      <View className={tabStyles.handleWrap}>
        <Pressable
          accessibilityLabel={isExpanded ? 'Collapse navigation' : 'Expand navigation'}
          accessibilityRole="button"
          accessibilityState={{ expanded: isExpanded }}
          onPress={() => setIsExpanded((value) => !value)}
          style={({ pressed }) => pressed && { opacity: 0.7 }}>
          <View className={tabStyles.handleButton}>
            <ThemedText type="small">{isExpanded ? '▲' : '▼'}</ThemedText>
          </View>
        </Pressable>
      </View>
    </View>
  );
}
