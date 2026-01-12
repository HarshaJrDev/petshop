import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Toast from '@/components/Toast';
import { useCartStore } from '@/src/store/useCartStore';
import { SafeAreaView } from 'react-native-safe-area-context';

const CartScreen: React.FC = () => {
  const { items, removeItem, getTotal } = useCartStore();
  const [toast, setToast] = useState<{
    message: string;
    type: 'success' | 'error' | 'info';
  } | null>(null);

  const handleRemove = (cartId: number, name: string) => {
    removeItem(cartId);
    setToast({ message: `${name} removed from cart`, type: 'success' });
  };

  if (items.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Ionicons name="cart-outline" size={64} color="#9CA3AF" />
        <Text style={styles.emptyTitle}>Your cart is empty</Text>
        <Text style={styles.emptySubtitle}>
          Items you add will appear here
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Toast
          message={toast?.message || ''}
          type={toast?.type || 'info'}
          visible={!!toast}
          onHide={() => setToast(null)}
        />

        <FlatList
          data={items}
          keyExtractor={(item) => item.cartId.toString()}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <View style={styles.cartItem}>
              <Image source={{ uri: item.imageUrl }} style={styles.image} />

              <View style={styles.details}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.breed}>{item.breed}</Text>
                <Text style={styles.price}>${item.price.toFixed(2)}</Text>
              </View>

              <TouchableOpacity
                onPress={() => handleRemove(item.cartId, item.name)}
                style={styles.removeButton}
              >
                <Ionicons
                  name="trash-outline"
                  size={20}
                  color="#6B7280"
                />
              </TouchableOpacity>
            </View>
          )}
        />

        <View style={styles.footer}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Subtotal</Text>
            <Text style={styles.totalAmount}>
              ${getTotal().toFixed(2)}
            </Text>
          </View>

          <TouchableOpacity style={styles.checkoutButton}>
            <Text style={styles.checkoutText}>Proceed to Checkout</Text>
          </TouchableOpacity>
        </View>
      </View>

    </SafeAreaView>

  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    paddingHorizontal: 32,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 16,
    color: '#111827',
  },
  emptySubtitle: {
    fontSize: 14,
    marginTop: 8,
    color: '#6B7280',
    textAlign: 'center',
  },
  list: {
    padding: 16,
  },

  cartItem: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    alignItems: 'center',
  },

  image: {
    width: 72,
    height: 72,
    borderRadius: 8,
    backgroundColor: '#E5E7EB',
  },

  details: {
    flex: 1,
    marginLeft: 12,
  },

  name: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 2,
  },

  breed: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 6,
  },

  price: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
  },

  removeButton: {
    padding: 8,
  },
  footer: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },

  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },

  totalLabel: {
    fontSize: 16,
    color: '#374151',
  },

  totalAmount: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },

  checkoutButton: {
    backgroundColor: '#111827',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },

  checkoutText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
