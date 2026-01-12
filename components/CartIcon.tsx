
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useCartStore } from '@/src/store/useCartStore';

interface Props {
    onPress: () => void;
}

const CartIcon: React.FC<Props> = ({ onPress }) => {
    const count = useCartStore((s) => s.items.length);

    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
            <Ionicons name="cart-outline" size={26} color="#111827" />

            {count > 0 && (
                <View style={styles.badge}>
                    <Text style={styles.badgeText}>{count}</Text>
                </View>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 8,
    },
    badge: {
        position: 'absolute',
        right: 2,
        top: 2,
        backgroundColor: '#B12704',
        borderRadius: 10,
        paddingHorizontal: 6,
        minWidth: 18,
        alignItems: 'center',
    },
    badgeText: {
        color: '#FFF',
        fontSize: 12,
        fontWeight: '700',
    },
});

export default CartIcon;
