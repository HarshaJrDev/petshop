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
import { Pet } from '../types';
import { fetchRandomDogImage } from '../services/api';
import Toast from '@/components/Toast';
import AddPetForm from '@/components/AddPetForm';


interface HomeScreenProps {
    onPetAdded: (pet: Pet) => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ onPetAdded }) => {
    const [randomDog, setRandomDog] = useState<string | null>(null);
    const [loadingDog, setLoadingDog] = useState(false);
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

    const handleFetchRandomDog = async () => {
        setLoadingDog(true);
        try {
            const imageUrl = await fetchRandomDogImage();
            setRandomDog(imageUrl);
            setToast({ message: 'Random dog image loaded!', type: 'success' });
        } catch (error) {
            setToast({ message: 'Failed to fetch dog image', type: 'error' });
        } finally {
            setLoadingDog(false);
        }
    };

    return (
        <ScrollView style={styles.container}>
            <Toast
                message={toast?.message || ''}
                type={toast?.type || 'info'}
                visible={!!toast}
                onHide={() => setToast(null)}
            />

            {/* Random Dog Section */}
            <View style={styles.randomDogSection}>
                <Text style={styles.sectionTitle}>🐕 Random Dog Image</Text>
                <TouchableOpacity
                    style={styles.fetchButton}
                    onPress={handleFetchRandomDog}
                    disabled={loadingDog}
                >
                    {loadingDog ? (
                        <ActivityIndicator color="#FFFFFF" />
                    ) : (
                        <Text style={styles.fetchButtonText}>Fetch Random Dog</Text>
                    )}
                </TouchableOpacity>
                {randomDog && (
                    <Image source={{ uri: randomDog }} style={styles.randomDogImage} />
                )}
            </View>

            {/* Add Pet Form */}
            <AddPetForm onPetAdded={onPetAdded} />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F3F4F6',
    },
    randomDogSection: {
        backgroundColor: '#FFFFFF',
        padding: 16,
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1F2937',
        marginBottom: 12,
    },
    fetchButton: {
        backgroundColor: '#8B5CF6',
        padding: 14,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 12,
    },
    fetchButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
    randomDogImage: {
        width: '100%',
        height: 250,
        borderRadius: 12,
    },
});

export default HomeScreen;