import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SPACING, BORDER_RADIUS } from '../constants/theme';
import { Camera, Sparkles, Box } from 'lucide-react-native';

const { width } = Dimensions.get('window');

const HomeScreen = ({ navigation }: any) => {
    // Subtle float animation for the icon
    const translateY = new Animated.Value(0);

    React.useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(translateY, {
                    toValue: -15,
                    duration: 2000,
                    useNativeDriver: true,
                }),
                Animated.timing(translateY, {
                    toValue: 0,
                    duration: 2000,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            {/* Background Decorative Shapes */}
            <View style={styles.blurCircle1} />
            <View style={styles.blurCircle2} />

            <View style={styles.content}>
                {/* Header Section */}
                <View style={styles.header}>
                    <View style={styles.logoBadge}>
                        <Sparkles color={COLORS.primary} size={16} />
                        <Text style={styles.logoBadgeText}>AI Powered</Text>
                    </View>
                    <Text style={styles.title}>Scan. Detect.{"\n"}Suggest.</Text>
                    <Text style={styles.subtitle}>
                        Discover missing items that complement your space.
                    </Text>
                </View>

                {/* Central Illustration Placeholder */}
                <Animated.View style={[styles.illustrationContainer, { transform: [{ translateY }] }]}>
                    <View style={styles.iconCircleBig}>
                        <LinearGradient
                            colors={['rgba(99, 102, 241, 0.2)', 'rgba(139, 92, 246, 0.1)']}
                            style={styles.iconCircleInner}
                        >
                            <Camera color={COLORS.primary} size={64} strokeWidth={1.5} />
                        </LinearGradient>
                    </View>
                    <View style={styles.floatingBox}>
                        <Box color={COLORS.accent} size={24} />
                    </View>
                </Animated.View>

                {/* Footer Section */}
                <View style={styles.footer}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Scanner')}
                        activeOpacity={0.9}
                    >
                        <LinearGradient
                            colors={[COLORS.primary, COLORS.secondary]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={styles.scanButton}
                        >
                            <Text style={styles.scanButtonText}>Start Scan</Text>
                            <View style={styles.scanButtonIcon}>
                                <Sparkles color="#fff" size={20} />
                            </View>
                        </LinearGradient>
                    </TouchableOpacity>

                    <Text style={styles.footerHint}>Point at your room to see the magic</Text>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
        overflow: 'hidden',
    },
    blurCircle1: {
        position: 'absolute',
        top: -50,
        right: -50,
        width: 250,
        height: 250,
        borderRadius: 125,
        backgroundColor: COLORS.primary,
        opacity: 0.1,
    },
    blurCircle2: {
        position: 'absolute',
        bottom: 100,
        left: -80,
        width: 300,
        height: 300,
        borderRadius: 150,
        backgroundColor: COLORS.secondary,
        opacity: 0.08,
    },
    content: {
        flex: 1,
        paddingHorizontal: SPACING.xl,
        justifyContent: 'space-between',
        paddingVertical: SPACING.xl,
    },
    header: {
        alignItems: 'center',
        marginTop: SPACING.xl,
    },
    logoBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(99, 102, 241, 0.1)',
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.xs,
        borderRadius: BORDER_RADIUS.full,
        borderWidth: 1,
        borderColor: 'rgba(99, 102, 241, 0.2)',
        marginBottom: SPACING.lg,
    },
    logoBadgeText: {
        color: COLORS.primary,
        fontSize: 12,
        fontWeight: '700',
        textTransform: 'uppercase',
        marginLeft: SPACING.xs,
        letterSpacing: 1,
    },
    title: {
        fontSize: 42,
        fontWeight: '800',
        color: COLORS.text,
        textAlign: 'center',
        lineHeight: 50,
        letterSpacing: -1,
    },
    subtitle: {
        fontSize: 18,
        color: COLORS.textMuted,
        textAlign: 'center',
        marginTop: SPACING.md,
        lineHeight: 26,
    },
    illustrationContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 280,
    },
    iconCircleBig: {
        width: 180,
        height: 180,
        borderRadius: 90,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconCircleInner: {
        width: '100%',
        height: '100%',
        borderRadius: 80,
        justifyContent: 'center',
        alignItems: 'center',
    },
    floatingBox: {
        position: 'absolute',
        top: 40,
        right: width / 2 - 100,
        backgroundColor: COLORS.surface,
        padding: SPACING.sm,
        borderRadius: BORDER_RADIUS.md,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
        elevation: 10,
        shadowColor: COLORS.accent,
        shadowOpacity: 0.3,
        shadowRadius: 10,
    },
    footer: {
        width: '100%',
        alignItems: 'center',
        marginBottom: SPACING.lg,
    },
    scanButton: {
        width: width - SPACING.xl * 4,
        height: 64,
        borderRadius: BORDER_RADIUS.full,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: SPACING.xl,
        elevation: 15,
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.4,
        shadowRadius: 15,
    },
    scanButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        marginRight: SPACING.sm,
    },
    scanButtonIcon: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        padding: 4,
        borderRadius: 8,
    },
    footerHint: {
        color: COLORS.textMuted,
        fontSize: 14,
        marginTop: SPACING.lg,
    },
});

export default HomeScreen;
