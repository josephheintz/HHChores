import React, { useState } from 'react';
import { Pressable, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/theme/themed-text';
import { ThemedView } from '@/components/theme/themed-view';
import { useTheme } from '@/hooks/use-theme';

import { styles } from './shopping-list.styles';

export default function ShopListScreen() {
    const theme = useTheme();
    const [items, setItems] = useState<string[]>([]);
    const [draftItem, setDraftItem] = useState('');

    const addItem = () => {
        const nextItem = draftItem.trim();
        if (!nextItem) {
            return;
        }

        setItems((previousItems) => [...previousItems, nextItem]);
        setDraftItem('');
    };

    const removeItem = (indexToRemove: number) => {
        setItems((previousItems) => previousItems.filter((_, index) => index !== indexToRemove));
    };

    return (
        <ThemedView style={styles.screen}>
            <SafeAreaView style={styles.container}>
                <ThemedText type="subtitle">Shopping List</ThemedText>

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
                    <ThemedView style={styles.list}>
                        {items.map((item, index) => (
                            <Pressable key={`${item}-${index}`} onPress={() => removeItem(index)}>
                                <ThemedView type="backgroundElement" style={styles.itemRow}>
                                    <ThemedText>{item}</ThemedText>
                                </ThemedView>
                            </Pressable>
                        ))}
                    </ThemedView>
                )}
            </SafeAreaView>
        </ThemedView>
    );
}
