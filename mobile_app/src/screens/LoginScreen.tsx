import React, { useRef, useEffect } from 'react';
import {
    View, Text, StyleSheet, TouchableOpacity,
    Dimensions, Animated, ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SPACING, BORDER_RADIUS } from '../constants/theme';
import { useAuth } from '../context/AuthContext';
import { Package, Sparkles } from 'lucide-react-native';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { width } = Dimensions.get('window');

const LoginScreen = () => {
    const { signInWithGoogle, loading } = useAuth();
    const [signingIn, setSigningIn] = React.useState(false);

    // Floating animation
    const float = useRef(new Animated.Value(0)).current;
    // Fade-in animation
    const fadeIn = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(fadeIn, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
        }).start();

        Animated.loop(
            Animated.sequence([
                Animated.timing(float, { toValue: -12, duration: 2000, useNativeDriver: true }),
                Animated.timing(float, { toValue: 0, duration: 2000, useNativeDriver: true }),
            ])
        ).start();
    }, [float, fadeIn]);

    const handleGoogleSignIn = async () => {
        setSigningIn(true);
        await signInWithGoogle();
        setSigningIn(false);
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={COLORS.primary} />
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            {/* Background glows */}
            <View style={styles.glow1} />
            <View style={styles.glow2} />

            <Animated.View style={[styles.content, { opacity: fadeIn }]}>
                {/* Hero Section */}
                <View style={styles.hero}>
                    <Animated.View style={[styles.iconWrapper, { transform: [{ translateY: float }] }]}>
                        <LinearGradient
                            colors={['rgba(99,102,241,0.3)', 'rgba(139,92,246,0.1)']}
                            style={styles.iconGradient}
                        >
                            <Package color={COLORS.primary} size={72} strokeWidth={1.2} />
                        </LinearGradient>
                        {/* Orbiting sparkle */}
                        <View style={styles.orbitDot}>
                            <Sparkles color={COLORS.accent} size={18} />
                        </View>
                    </Animated.View>

                    <View style={styles.badge}>
                        <Sparkles color={COLORS.primary} size={12} />
                        <Text style={styles.badgeText}>AI TRAVEL PREP</Text>
                    </View>

                    <Text style={styles.title}>PackWise</Text>
                    <Text style={styles.subtitle}>
                        Scan your gear. Know what's missing.{'\n'}Travel smarter.
                    </Text>
                </View>

                {/* Auth Section */}
                <View style={styles.authSection}>
                    <TouchableOpacity
                        style={styles.googleButton}
                        onPress={handleGoogleSignIn}
                        disabled={signingIn}
                        activeOpacity={0.85}
                    >
                        {signingIn ? (
                            <ActivityIndicator color={COLORS.background} />
                        ) : (
                            <>
                                {/* Google "G" logo as SVG-like text approach */}
                                <View style={styles.googleLogo}>
                                    <Text style={styles.googleLogoText}>G</Text>
                                </View>
                                <Text style={styles.googleButtonText}>Continue with Google</Text>
                            </>
                        )}
                    </TouchableOpacity>

                    <Text style={styles.terms}>
                        By continuing, you agree to our Terms of Service{'\n'}and Privacy Policy.
                    </Text>
                </View>
            </Animated.View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
        overflow: 'hidden',
    },
    loadingContainer: {
        flex: 1,
        backgroundColor: COLORS.background,
        justifyContent: 'center',
        alignItems: 'center',
    },
    glow1: {
        position: 'absolute',
        top: -80,
        left: -80,
        width: 300,
        height: 300,
        borderRadius: 150,
        backgroundColor: COLORS.primary,
        opacity: 0.08,
    },
    glow2: {
        position: 'absolute',
        bottom: 0,
        right: -60,
        width: 280,
        height: 280,
        borderRadius: 140,
        backgroundColor: COLORS.secondary,
        opacity: 0.1,
    },
    content: {
        flex: 1,
        justifyContent: 'space-between',
        paddingHorizontal: SPACING.xl,
        paddingVertical: SPACING.xl,
    },
    hero: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        gap: SPACING.md,
    },
    iconWrapper: {
        position: 'relative',
        marginBottom: SPACING.lg,
    },
    iconGradient: {
        width: 160,
        height: 160,
        borderRadius: 80,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(99, 102, 241, 0.2)',
    },
    orbitDot: {
        position: 'absolute',
        top: 10,
        right: -4,
        backgroundColor: COLORS.surface,
        borderRadius: BORDER_RADIUS.full,
        padding: SPACING.xs,
        borderWidth: 1,
        borderColor: 'rgba(236, 72, 153, 0.3)',
        elevation: 8,
    },
    badge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.xs,
        backgroundColor: 'rgba(99, 102, 241, 0.12)',
        paddingHorizontal: SPACING.md,
        paddingVertical: 6,
        borderRadius: BORDER_RADIUS.full,
        borderWidth: 1,
        borderColor: 'rgba(99, 102, 241, 0.25)',
    },
    badgeText: {
        color: COLORS.primary,
        fontSize: 11,
        fontWeight: '700',
        letterSpacing: 1.5,
    },
    title: {
        fontSize: 48,
        fontWeight: '800',
        color: COLORS.text,
        letterSpacing: -1.5,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 17,
        color: COLORS.textMuted,
        textAlign: 'center',
        lineHeight: 26,
        paddingHorizontal: SPACING.lg,
    },
    authSection: {
        gap: SPACING.md,
        paddingBottom: SPACING.lg,
    },
    googleButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        borderRadius: BORDER_RADIUS.full,
        height: 60,
        gap: SPACING.sm,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
    },
    googleLogo: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: '#4285F4',
        justifyContent: 'center',
        alignItems: 'center',
    },
    googleLogoText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '700',
    },
    googleButtonText: {
        color: '#1f2937',
        fontSize: 16,
        fontWeight: '600',
    },
    terms: {
        color: COLORS.textMuted,
        fontSize: 12,
        textAlign: 'center',
        lineHeight: 18,
    },
});

export default LoginScreen;
