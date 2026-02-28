import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SPACING, BORDER_RADIUS } from '../constants/theme';
import { ArrowLeft, RefreshCcw, Sparkles } from 'lucide-react-native';

const SuggestionsScreen = ({ route, navigation }: any) => {
    const { suggestions = "No suggestions were generated. Please try scanning again." } = route.params || {};

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <ArrowLeft color={COLORS.text} size={24} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>AI Analysis</Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <View style={styles.card}>
                    <View style={styles.cardHeader}>
                        <Sparkles color={COLORS.primary} size={24} />
                        <Text style={styles.cardTitle}>Gemini Suggestions</Text>
                    </View>
                    <Text style={styles.suggestionText}>{suggestions}</Text>
                </View>

                <TouchableOpacity
                    style={styles.scanAgainButton}
                    onPress={() => navigation.goBack()}
                >
                    <RefreshCcw color={COLORS.text} size={20} />
                    <Text style={styles.scanAgainText}>Scan Again</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: SPACING.lg,
        paddingVertical: SPACING.md,
    },
    backButton: {
        padding: SPACING.sm,
    },
    headerTitle: {
        color: COLORS.text,
        fontSize: 20,
        fontWeight: 'bold',
    },
    scrollContent: {
        paddingHorizontal: SPACING.lg,
        paddingBottom: SPACING.xl,
    },
    card: {
        backgroundColor: COLORS.surface,
        borderRadius: BORDER_RADIUS.lg,
        padding: SPACING.lg,
        marginTop: SPACING.md,
        marginBottom: SPACING.xl,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: SPACING.md,
        gap: SPACING.sm,
    },
    cardTitle: {
        color: COLORS.primary,
        fontSize: 18,
        fontWeight: 'bold',
    },
    suggestionText: {
        color: COLORS.text,
        fontSize: 16,
        lineHeight: 24,
    },
    scanAgainButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.primary,
        padding: SPACING.md,
        borderRadius: BORDER_RADIUS.md,
        gap: SPACING.sm,
    },
    scanAgainText: {
        color: COLORS.text,
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default SuggestionsScreen;
