import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    StyleSheet,
    ScrollView,
    ActivityIndicator,
    Alert,
    Modal,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';

import Toast from './Toast';
import { Pet } from '@/src/types';
import { petSchema } from '@/src/utils/validation';
import { submitPetDetails } from '@/src/services/api';

interface AddPetFormProps {
    onPetAdded?: (pet: Pet) => void;
}

const noop = () => { };

const AddPetForm: React.FC<AddPetFormProps> = ({
    onPetAdded = noop,
}) => {
    const [visible, setVisible] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        breed: '',
        age: '',
        price: '',
    });

    const [image, setImage] = useState<string | null>(null);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState<{
        message: string;
        type: 'success' | 'error' | 'info';
    } | null>(null);

    const requestPermissions = async (): Promise<boolean> => {
        const { status } =
            await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert(
                'Permission Required',
                'Please allow photo access to upload pet images.'
            );
            return false;
        }
        return true;
    };

    const pickImage = async (fromCamera = false) => {
        const hasPermission = await requestPermissions();
        if (!hasPermission) return;

        const result = fromCamera
            ? await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                quality: 0.8,
            })
            : await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                quality: 0.8,
            });

        if (!result.canceled && result.assets?.[0]) {
            setImage(result.assets[0].uri);
        }
    };

    const handleSubmit = async () => {
        try {
            setLoading(true);

            const normalizedData = {
                name: formData.name.trim(),
                breed: formData.breed.trim(),
                age: Number(formData.age),
                price: Number(formData.price),
            };

            await petSchema.validate(normalizedData, { abortEarly: false });
            setErrors({});

            const response = await submitPetDetails(normalizedData);

            const newPet: Pet = {
                id: response.id,
                name: normalizedData.name,
                breed: normalizedData.breed,
                age: String(normalizedData.age),
                price: String(normalizedData.price),
                image:
                    image ??
                    'https://via.placeholder.com/300x200?text=No+Image',
            };

            onPetAdded(newPet);

            setFormData({ name: '', breed: '', age: '', price: '' });
            setImage(null);
            setVisible(false);
            setToast({ message: 'Pet added successfully', type: 'success' });
        } catch (error: any) {
            if (error?.name === 'ValidationError') {
                const validationErrors: Record<string, string> = {};
                error.inner.forEach((err: any) => {
                    if (err.path) validationErrors[err.path] = err.message;
                });
                setErrors(validationErrors);
            } else {
                setToast({
                    message: error?.message ?? 'Failed to add pet',
                    type: 'error',
                });
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <TouchableOpacity
                style={styles.openButton}
                onPress={() => setVisible(true)}
            >
                <Ionicons name="add-circle-outline" size={20} />
                <Text style={styles.openButtonText}>Add New Pet</Text>
            </TouchableOpacity>
            <Modal
                visible={visible}
                animationType="slide"
                presentationStyle="pageSheet"
                onRequestClose={() => setVisible(false)}
            >
                <ScrollView style={styles.container}>
                    <Toast
                        message={toast?.message || ''}
                        type={toast?.type || 'info'}
                        visible={!!toast}
                        onHide={() => setToast(null)}
                    />

                    <View style={styles.header}>
                        <Text style={styles.title}>Add a New Pet</Text>
                        <TouchableOpacity onPress={() => setVisible(false)}>
                            <Ionicons name="close" size={24} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.card}>
                        <Text style={styles.sectionTitle}>Pet Image</Text>

                        <View style={styles.imageActions}>
                            <TouchableOpacity
                                style={styles.imageButton}
                                onPress={() => pickImage(true)}
                            >
                                <Ionicons name="camera-outline" size={18} />
                                <Text style={styles.imageButtonText}>Camera</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.imageButton}
                                onPress={() => pickImage(false)}
                            >
                                <Ionicons name="image-outline" size={18} />
                                <Text style={styles.imageButtonText}>Gallery</Text>
                            </TouchableOpacity>
                        </View>

                        {image && (
                            <Image source={{ uri: image }} style={styles.imagePreview} />
                        )}
                    </View>

                    <View style={styles.card}>
                        {(['name', 'breed', 'age', 'price'] as const).map((field) => (
                            <View key={field} style={styles.inputGroup}>
                                <Text style={styles.label}>{field.toUpperCase()}</Text>
                                <TextInput
                                    style={[
                                        styles.input,
                                        errors[field] && styles.inputError,
                                    ]}
                                    value={formData[field]}
                                    onChangeText={(text) =>
                                        setFormData((p) => ({ ...p, [field]: text }))
                                    }
                                    keyboardType={
                                        field === 'age'
                                            ? 'numeric'
                                            : field === 'price'
                                                ? 'decimal-pad'
                                                : 'default'
                                    }
                                    placeholder={`Enter ${field}`}
                                />
                                {errors[field] && (
                                    <Text style={styles.errorText}>{errors[field]}</Text>
                                )}
                            </View>
                        ))}
                    </View>

                    <TouchableOpacity
                        style={[
                            styles.submitButton,
                            loading && styles.submitButtonDisabled,
                        ]}
                        onPress={handleSubmit}
                        disabled={loading}
                    >
                        {loading ? (
                            <ActivityIndicator color="#111827" />
                        ) : (
                            <Text style={styles.submitButtonText}>Add Pet</Text>
                        )}
                    </TouchableOpacity>
                </ScrollView>
            </Modal>
        </>
    );
};

export default AddPetForm;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9FAFB',
        padding: 16,
    },
    openButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#E0E7FF',
        padding: 12,
        borderRadius: 8,
    },
    openButtonText: {
        marginLeft: 8,
        fontSize: 16,
        fontWeight: '600',
        color: '#3730A3',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    title: {
        fontSize: 20,
        fontWeight: '700',
        color: '#111827',
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1F2937',
        marginBottom: 12,
    },
    imageActions: {
        flexDirection: 'row',
        marginBottom: 12,
    },
    imageButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#E5E7EB',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 8,
        marginRight: 12,
    },
    imageButtonText: {
        marginLeft: 6,
        fontSize: 14,
        color: '#374151',
    },
    imagePreview: {
        width: '100%',
        height: 200,
        borderRadius: 12,
        marginTop: 12,
    },
    inputGroup: {
        marginBottom: 12,
    },
    label: {
        fontSize: 14,
        fontWeight: '500',
        color: '#4B5563',
        marginBottom: 4,
    },
    input: {
        borderWidth: 1,
        borderColor: '#D1D5DB',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 8,
        fontSize: 16,
        color: '#111827',
        backgroundColor: '#F9FAFB',
    },
    inputError: {
        borderColor: '#EF4444',
    },
    errorText: {
        color: '#EF4444',
        fontSize: 12,
        marginTop: 4,
    },
    submitButton: {
        backgroundColor: '#10B981',
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: 'center',
    },
    submitButtonDisabled: {
        backgroundColor: '#6EE7B7',
    },
    submitButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
});     
