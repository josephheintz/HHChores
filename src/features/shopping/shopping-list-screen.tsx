import React, { useState } from 'react';
import { Pressable, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/theme/themed-text';
import { ThemedView } from '@/components/theme/themed-view';
import { DataTable } from '@/components/ui/data-table';
import { useTheme } from '@/hooks/use-theme';

import { styles } from './shopping-list.styles';

interface ShoppingItem {
  id: string;
  name: string;
  priority: string;
}

const initialItems: ShoppingItem[] = [
  { id: '1', name: 'Milk', priority: '10' },
  { id: '2', name: 'Bread', priority: '5' },
  { id: '3', name: 'Eggs', priority: '7' },
];

export default function ShopListScreen() {
    const theme = useTheme();
    const [items, setItems] = useState<ShoppingItem[]>(initialItems);
    const [draftItem, setDraftItem] = useState('');
    const [nextId, setNextId] = useState(4); 

    const addItem = () => {
        const nextItem = draftItem.trim();
        if (!nextItem) {
            return;
        }

        setItems((previousItems) => [
            ...previousItems,
            { id: nextId.toString(), name: nextItem, priority: '5' },
        ]);
        setNextId((prev) => prev + 1);
        setDraftItem('');
    };

    const removeItem = (itemId: string) => {
        setItems((previousItems) => previousItems.filter((item) => item.id !== itemId));
    };

    return (
        <ThemedView style={styles.screen}>
            <SafeAreaView style={styles.container}>
                <ThemedText type="subtitle" style={styles.pageTitle}>List Tab</ThemedText>

                <ThemedView style={styles.inputRow}>
                    <TextInput
                        placeholder="Add item"
                        placeholderTextColor={theme.textSecondary}
                        value={draftItem}
                        onChangeText={setDraftItem}
                        onSubmitEditing={addItem}
                        style={[
                            styles.input,
                            {
                                color: theme.text,
                                borderColor: theme.backgroundSelected,
                            },
                        ]}
                    />

                    <Pressable
                        onPress={addItem}
                        style={({ pressed }) => [
                            styles.addButton,
                            {
                                backgroundColor: theme.backgroundElement,
                                opacity: pressed ? 0.7 : 1,
                            },
                        ]}>
                        <ThemedText>Add</ThemedText>
                    </Pressable>
                </ThemedView>

                {items.length === 0 ? (
                    <ThemedText themeColor="textSecondary">No items yet.</ThemedText>
                ) : (
                    <DataTable
                        data={items}
                        columns={[
                            {
                                key: 'name',
                                label: 'Item',
                            },
                            {
                                key: 'priority',
                                label: 'Priority',
                            },
                        ]}
                        title="Shopping List"
                        keyExtractor={(item) => item.id}
                        emptyMessage="No items yet."
                        actions={[
                            {
                                label: 'Remove',
                                onPress: (item) => removeItem(item.id),
                            },
                        ]}
                    />
                )}
            </SafeAreaView>
        </ThemedView>
    );
}
