import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SPACING, BORDER_RADIUS } from '../constants/theme';
import { Camera } from 'lucide-react-native';

const HomeScreen = ({ navigation }: any) => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <View style={styles.header}>
                    <Text style={styles.title}>Scan & Suggest</Text>
                    <Text style={styles.subtitle}>
                        Welcome! Discover missing items by scanning your environment using AI object detection.
                    </Text>
                </View>

                <TouchableOpacity
                    style={styles.scanButton}
                    onPress={() => navigation.navigate('Scanner')}
                    activeOpacity={0.8}
                >
                    <Camera color={COLORS.text} size={28} />
                    <Text style={styles.scanButtonText}>Open Scanner</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    content: {
        flex: 1,
        padding: SPACING.xl,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        alignItems: 'center',
        marginBottom: SPACING.xl * 2,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: COLORS.primary,
        marginBottom: SPACING.md,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: COLORS.textMuted,
        textAlign: 'center',
        lineHeight: 24,
        paddingHorizontal: SPACING.lg,
    },
    scanButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.primary,
        paddingVertical: SPACING.lg,
        paddingHorizontal: SPACING.xl,
        borderRadius: BORDER_RADIUS.full,
        elevation: 8,
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
        gap: SPACING.md,
    },
    scanButtonText: {
        color: COLORS.text,
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default HomeScreen;
