import React, { memo, useCallback } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Pet } from '@/src/types';

interface Props {
    pet: Pet;
    onAddToCart: (pet: Pet) => void;
}

const PetCard: React.FC<Props> = ({ pet, onAddToCart }) => {
    const handleAdd = useCallback(() => {
        onAddToCart(pet);
    }, [onAddToCart, pet]);

    return (
        <View style={styles.card}>
            <Image source={{ uri: pet.imageUrl }} style={styles.image} />

            <View style={styles.body}>
                <Text style={styles.title}>{pet.name}</Text>
                <Text style={styles.subtitle}>{pet.breed}</Text>

                <View style={styles.row}>
                    <Text style={styles.price}>${pet.price}</Text>

                    <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
                        <Ionicons name="cart-outline" size={18} color="#FFFFFF" />
                        <Text style={styles.addButtonText}>Add</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default memo(PetCard);

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        overflow: 'hidden',
        marginBottom: 16,
    },
    image: {
        width: '100%',
        height: 200,
        backgroundColor: '#E5E7EB',
    },
    body: {
        padding: 16,
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        color: '#111827',
    },
    subtitle: {
        fontSize: 13,
        color: '#6B7280',
        marginTop: 4,
    },
    row: {
        marginTop: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    price: {
        fontSize: 18,
        fontWeight: '700',
        color: '#B12704',
    },
    addButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFA41C',
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 20,
    },
    addButtonText: {
        color: '#FFFFFF',
        fontWeight: '600',
        marginLeft: 6,
    },
});
