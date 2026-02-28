import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import { COLORS, SPACING, BORDER_RADIUS } from '../constants/theme';
import { AlertCircle, ArrowLeft, RefreshCcw } from 'lucide-react-native';
import { MOCK_CONTEXTS } from '../data/mockData';

const SuggestionsScreen = ({ route, navigation }: any) => {
    const { detected = [] } = route.params || {};
    const currentContext = MOCK_CONTEXTS[0]; // Default to travel for now

    const missingItems = currentContext.items.filter(
        (item) => !detected.some((d: string) => d.toLowerCase().includes(item.name.toLowerCase()))
    );

    const renderItem = ({ item }: { item: any }) => (
        <View style={styles.itemCard}>
            <View style={styles.itemInfo}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemCategory}>{item.category}</Text>
            </View>
            {item.important && (
                <View style={styles.tagImportant}>
                    <Text style={styles.tagText}>CRITICAL</Text>
                </View>
            )}
            <AlertCircle color={COLORS.error} size={20} />
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <ArrowLeft color={COLORS.text} size={24} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Missing Items</Text>
                <View style={{ width: 40 }} />
            </View>

            <View style={styles.summaryCard}>
                <View style={styles.summaryItem}>
                    <Text style={styles.summaryValue}>{detected.length}</Text>
                    <Text style={styles.summaryLabel}>Detected</Text>
                </View>
                <View style={[styles.summaryItem, styles.summaryBorder]}>
                    <Text style={styles.summaryValue}>{missingItems.length}</Text>
                    <Text style={[styles.summaryLabel, { color: COLORS.error }]}>Missing</Text>
                </View>
                <View style={styles.summaryItem}>
                    <Text style={styles.summaryValue}>
                        {Math.round(((currentContext.items.length - missingItems.length) / currentContext.items.length) * 100)}%
                    </Text>
                    <Text style={styles.summaryLabel}>Complete</Text>
                </View>
            </View>

            <Text style={styles.sectionTitle}>We couldn't find these items:</Text>

            <FlatList
                data={missingItems}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
            />

            <TouchableOpacity
                style={styles.scanAgainButton}
                onPress={() => navigation.navigate('Scanner')}
            >
                <RefreshCcw color={COLORS.text} size={20} />
                <Text style={styles.scanAgainText}>Scan Again</Text>
            </TouchableOpacity>
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
    summaryCard: {
        flexDirection: 'row',
        backgroundColor: COLORS.surface,
        margin: SPACING.lg,
        padding: SPACING.lg,
        borderRadius: BORDER_RADIUS.lg,
        justifyContent: 'space-around',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    summaryItem: {
        alignItems: 'center',
        flex: 1,
    },
    summaryBorder: {
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    summaryValue: {
        color: COLORS.text,
        fontSize: 24,
        fontWeight: 'bold',
    },
    summaryLabel: {
        color: COLORS.textMuted,
        fontSize: 12,
        marginTop: 4,
    },
    sectionTitle: {
        color: COLORS.text,
        fontSize: 16,
        fontWeight: '600',
        marginHorizontal: SPACING.lg,
        marginBottom: SPACING.sm,
    },
    listContent: {
        paddingHorizontal: SPACING.lg,
        paddingBottom: SPACING.xl,
    },
    itemCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.surface,
        padding: SPACING.md,
        borderRadius: BORDER_RADIUS.md,
        marginBottom: SPACING.sm,
    },
    itemInfo: {
        flex: 1,
    },
    itemName: {
        color: COLORS.text,
        fontSize: 16,
        fontWeight: '500',
    },
    itemCategory: {
        color: COLORS.textMuted,
        fontSize: 12,
    },
    tagImportant: {
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 4,
        marginRight: 12,
        borderWidth: 1,
        borderColor: 'rgba(239, 68, 68, 0.2)',
    },
    tagText: {
        color: COLORS.error,
        fontSize: 10,
        fontWeight: 'bold',
    },
    scanAgainButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.primary,
        margin: SPACING.lg,
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
