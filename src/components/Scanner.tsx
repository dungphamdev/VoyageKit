import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { COLORS, SPACING, BORDER_RADIUS } from '../constants/theme';
import { Scan, X, Zap, RotateCw } from 'lucide-react-native';

const { width } = Dimensions.get('window');

const Scanner = ({ onObjectDetected }: { onObjectDetected: (object: string) => void }) => {
    const [permission, requestPermission] = useCameraPermissions();
    const [facing, setFacing] = useState<'back' | 'front'>('back');
    const [flash, setFlash] = useState(false);

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

    return (
        <View style={styles.container}>
            <CameraView style={styles.camera} facing={facing} flash={flash ? 'on' : 'off'}>
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
                        <TouchableOpacity style={styles.flipButton} onPress={toggleCameraFacing}>
                            <RotateCw color={COLORS.text} size={24} />
                        </TouchableOpacity>
                        <View style={styles.statusBadge}>
                            <Scan color={COLORS.success} size={16} />
                            <Text style={styles.statusText}>AI Active</Text>
                        </View>
                        <View style={{ width: 24 }} />
                    </View>
                </View>
            </CameraView>
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
        flex: 1,
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
