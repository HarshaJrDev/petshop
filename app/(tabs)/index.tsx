import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

import Toast from '@/components/Toast';
import AddPetForm from '@/components/AddPetForm';
import CartIcon from '@/components/CartIcon';
import { Pet } from '@/src/types';
import { fetchRandomDogImage } from '@/src/data/petApi';
import { useCartStore } from '@/src/store/useCartStore';
import PetListingScreen from '@/components/PetListingScreen';

interface HomeScreenProps {
  onPetAdded: (pet: Pet) => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ onPetAdded }) => {
  const [randomDog, setRandomDog] = useState<string | null>(null);
  const [loadingDog, setLoadingDog] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: 'success' | 'error' | 'info';
  } | null>(null);

  const addItem = useCartStore((s) => s.addItem);

  const handleFetchRandomDog = async () => {
    setLoadingDog(true);
    try {
      const imageUrl = await fetchRandomDogImage();
      setRandomDog(imageUrl);
      setToast({ message: 'Dog loaded', type: 'success' });
    } catch {
      setToast({ message: 'Failed to load dog', type: 'error' });
    } finally {
      setLoadingDog(false);
    }
  };

  const handleAddToCart = () => {
    if (!randomDog) return;

    const pet: Pet = {
      id: randomDog,
      name: 'Max',
      breed: 'Labrador Retriever',
      price: 500,
      imageUrl: randomDog,
    };

    addItem(pet);
    setToast({ message: 'Added to cart', type: 'success' });
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Pet Store</Text>
        <CartIcon onPress={() => router.push('/explore')} />
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <Toast
          message={toast?.message || ''}
          type={toast?.type || 'info'}
          visible={!!toast}
          onHide={() => setToast(null)}
        />
        {/* <TouchableOpacity
          style={styles.primaryButton}
          onPress={handleFetchRandomDog}
          disabled={loadingDog}
        >
          {loadingDog ? (
            <ActivityIndicator color="#111827" />
          ) : (
            <Text style={styles.primaryButtonText}>
              Fetch Random Pet
            </Text>
          )}
        </TouchableOpacity> */}

        <AddPetForm onPetAdded={onPetAdded} />

        <PetListingScreen />
        {randomDog && (
          <View style={styles.card}>
            <Image source={{ uri: randomDog }} style={styles.image} />

            <View style={styles.cardBody}>
              <Text style={styles.title}>Random Dog</Text>
              <Text style={styles.subtitle}>
                Breed information unavailable
              </Text>

              <View style={styles.row}>
                <Text style={styles.price}>$500</Text>

                <TouchableOpacity
                  style={styles.addButton}
                  onPress={handleAddToCart}
                >
                  <Ionicons
                    name="cart-outline"
                    size={18}
                    color="#FFFFFF"
                  />
                  <Text style={styles.addButtonText}>Add to Cart</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}


      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    height: 56,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#E5E7EB',
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  container: {
    padding: 16,
  },

  primaryButton: {
    backgroundColor: '#FFD814',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 16,
  },

  primaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 24,
  },

  image: {
    width: '100%',
    height: 240,
    backgroundColor: '#E5E7EB',
  },

  cardBody: {
    padding: 16,
  },

  title: {
    fontSize: 17,
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
    fontSize: 20,
    fontWeight: '700',
    color: '#B12704',
  },

  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFA41C',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
  },

  addButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    marginLeft: 8,
  },
});
