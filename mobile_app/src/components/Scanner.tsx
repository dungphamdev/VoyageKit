import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, ActivityIndicator, Alert } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { COLORS, SPACING, BORDER_RADIUS } from '../constants/theme';
import { Scan, X, Zap, RotateCw, Camera } from 'lucide-react-native';

const { width } = Dimensions.get('window');
const INVALID_API_URL_MARKERS = ['<YOUR_LOCAL_IP>', 'localhost', '127.0.0.1'];

const getAnalyzeApiUrl = () => {
    const apiUrl = process.env.EXPO_PUBLIC_API_URL?.trim();
    if (!apiUrl) {
        throw new Error('Missing EXPO_PUBLIC_API_URL in mobile_app/.env');
    }

    const hasInvalidMarker = INVALID_API_URL_MARKERS.some((marker) => apiUrl.includes(marker));
    if (hasInvalidMarker) {
        throw new Error(`Invalid EXPO_PUBLIC_API_URL: ${apiUrl}. Use your computer's LAN IP, e.g. http://192.168.x.x:3000/api/analyze`);
    }

    return apiUrl;
};

const Scanner = ({ onObjectDetected }: { onObjectDetected: (suggestions: string) => void }) => {
    const [permission, requestPermission] = useCameraPermissions();
    const [facing, setFacing] = useState<'back' | 'front'>('back');
    const [flash, setFlash] = useState(false);
    const cameraRef = useRef<CameraView>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    if (!permission) {
        return <View />;
    }

    if (!permission.granted) {
        return (
            <View style={styles.container}>
                <Text style={styles.message}>We need your permission to show the camera</Text>
                <TouchableOpacity style={styles.button} onPress={requestPermission}>
                    <Text style={styles.buttonText}>Grant Permission</Text>
                </TouchableOpacity>
            </View>
        );
    }

    function toggleCameraFacing() {
        setFacing((current) => (current === 'back' ? 'front' : 'back'));
    }

    async function takePicture() {
        if (!cameraRef.current || isAnalyzing) return;
        setIsAnalyzing(true);
        try {
            const photo = await cameraRef.current.takePictureAsync({ base64: true, quality: 0.5 });
            if (!photo) return;

            const formData = new FormData();
            formData.append('image', {
                uri: photo.uri,
                name: 'photo.jpg',
                type: 'image/jpeg',
            } as any);

            const apiUrl = getAnalyzeApiUrl();

            const response = await fetch(apiUrl, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json',
                }
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                console.error("Server responded with error:", response.status, errorData);
                throw new Error(errorData.details || errorData.error || `Server error (${response.status})`);
            }

            const data = await response.json();
            if (data.success) {
                onObjectDetected(data.suggestions);
            } else {
                Alert.alert("Analysis Failed", data.error || "Unknown error parsing image.");
            }
        } catch (e: any) {
            console.error("Error capturing/sending photo:", e);
            Alert.alert("Analysis Error", e.message || "Could not reach the backend. Ensure it is running and the IP matches.");
        } finally {
            setIsAnalyzing(false);
        }
    }

    return (
        <View style={styles.container}>
            <CameraView ref={cameraRef} style={StyleSheet.absoluteFillObject} facing={facing} flash={flash ? 'on' : 'off'} />

            <View style={styles.overlay}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity style={styles.iconButton}>
                        <X color={COLORS.text} size={24} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Scanning Objects</Text>
                    <TouchableOpacity style={styles.iconButton} onPress={() => setFlash(!flash)}>
                        <Zap color={flash ? COLORS.warning : COLORS.text} size={24} fill={flash ? COLORS.warning : 'none'} />
                    </TouchableOpacity>
                </View>

                {/* Scanner Frame */}
                <View style={styles.scannerContainer}>
                    <View style={styles.scannerFrame}>
                        <View style={[styles.corner, styles.cornerTopLeft]} />
                        <View style={[styles.corner, styles.cornerTopRight]} />
                        <View style={[styles.corner, styles.cornerBottomLeft]} />
                        <View style={[styles.corner, styles.cornerBottomRight]} />

                        <View style={styles.scanLine} />
                    </View>
                    <Text style={styles.hint}>Point your camera at an object</Text>
                </View>

                {/* Footer */}
                <View style={styles.footer}>
                    <TouchableOpacity style={styles.flipButton} onPress={toggleCameraFacing} disabled={isAnalyzing}>
                        <RotateCw color={COLORS.text} size={24} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.captureButton} onPress={takePicture} disabled={isAnalyzing}>
                        <View style={styles.captureButtonInner}>
                            {isAnalyzing ? (
                                <ActivityIndicator color={COLORS.primary} size="large" />
                            ) : (
                                <Camera color={COLORS.primary} size={32} />
                            )}
                        </View>
                    </TouchableOpacity>

                    <View style={styles.statusBadge}>
                        <Scan color={COLORS.success} size={16} />
                        <Text style={styles.statusText}>AI Ready</Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    message: {
        textAlign: 'center',
        paddingBottom: 10,
        color: COLORS.text,
    },
    camera: {
        flex: 1,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'space-between',
        padding: SPACING.lg,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: SPACING.xl,
    },
    headerTitle: {
        color: COLORS.text,
        fontSize: 18,
        fontWeight: '600',
    },
    iconButton: {
        padding: SPACING.sm,
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: BORDER_RADIUS.full,
    },
    scannerContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    scannerFrame: {
        width: width * 0.7,
        height: width * 0.7,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.2)',
        position: 'relative',
    },
    corner: {
        position: 'absolute',
        width: 20,
        height: 20,
        borderColor: COLORS.primary,
        borderWidth: 4,
    },
    cornerTopLeft: {
        top: -2,
        left: -2,
        borderRightWidth: 0,
        borderBottomWidth: 0,
    },
    cornerTopRight: {
        top: -2,
        right: -2,
        borderLeftWidth: 0,
        borderBottomWidth: 0,
    },
    cornerBottomLeft: {
        bottom: -2,
        left: -2,
        borderRightWidth: 0,
        borderTopWidth: 0,
    },
    cornerBottomRight: {
        bottom: -2,
        right: -2,
        borderLeftWidth: 0,
        borderTopWidth: 0,
    },
    scanLine: {
        height: 2,
        backgroundColor: COLORS.primary,
        width: '100%',
        position: 'absolute',
        top: '50%',
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 10,
        elevation: 5,
    },
    hint: {
        color: COLORS.text,
        marginTop: SPACING.lg,
        fontSize: 14,
        backgroundColor: 'rgba(0,0,0,0.5)',
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.xs,
        borderRadius: BORDER_RADIUS.full,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: SPACING.xl,
    },
    captureButton: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: 'rgba(255,255,255,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    captureButtonInner: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: COLORS.surface,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    flipButton: {
        padding: SPACING.sm,
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: BORDER_RADIUS.full,
    },
    statusBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.7)',
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.xs,
        borderRadius: BORDER_RADIUS.full,
        gap: SPACING.xs,
    },
    statusText: {
        color: COLORS.success,
        fontSize: 12,
        fontWeight: 'bold',
    },
    button: {
        backgroundColor: COLORS.primary,
        padding: SPACING.md,
        borderRadius: BORDER_RADIUS.md,
        alignSelf: 'center',
    },
    buttonText: {
        color: COLORS.text,
        fontWeight: 'bold',
    },
});

export default Scanner;
