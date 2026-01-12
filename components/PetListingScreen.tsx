import React, { useCallback } from 'react';
import { FlatList, SafeAreaView, StyleSheet } from 'react-native';


import { DUMMY_PETS } from '@/src/data/dummyPets';

import { Pet } from '@/src/types';
import { useCartStore } from '@/src/store/useCartStore';
import PetCard from '@/components/PetCard';

const PetListingScreen: React.FC = () => {
    const addItem = useCartStore((s) => s.addItem);

    const handleAddToCart = useCallback(
        (pet: Pet) => {
            addItem(pet);
        },
        [addItem]
    );

    return (
        <SafeAreaView style={styles.safe}>
            <FlatList
                data={DUMMY_PETS}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <PetCard pet={item} onAddToCart={handleAddToCart} />
                )}
                estimatedItemSize={280}
                contentContainerStyle={styles.content}
            />
        </SafeAreaView>
    );
};

export default PetListingScreen;

const styles = StyleSheet.create({
    safe: {
        flex: 1,
        backgroundColor: '#F9FAFB',
    },
    content: {
        padding: 16,
    },
});
