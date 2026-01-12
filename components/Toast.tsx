import { ToastProps } from '@/src/types';
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';


interface ToastComponentProps extends ToastProps {
    visible: boolean;
    onHide: () => void;
}

const Toast: React.FC<ToastComponentProps> = ({ message, type, visible, onHide }) => {
    const opacity = React.useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (visible) {
            Animated.sequence([
                Animated.timing(opacity, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.delay(2700),
                Animated.timing(opacity, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true,
                }),
            ]).start(() => {
                onHide();
            });
        }
    }, [visible]);

    if (!visible) return null;

    const backgroundColor =
        type === 'success' ? '#10B981' :
            type === 'error' ? '#EF4444' :
                '#3B82F6';

    return (
        <Animated.View style={[styles.container, { opacity, backgroundColor }]}>
            <Text style={styles.message}>{message}</Text>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 50,
        left: 20,
        right: 20,
        padding: 16,
        borderRadius: 8,
        zIndex: 1000,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
    message: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
    },
});

export default Toast;