import React from 'react';
import { View, StyleSheet } from 'react-native';
import Scanner from '../components/Scanner';
import { COLORS } from '../constants/theme';

const ScannerScreen = ({ navigation }: any) => {
    const handleObjectDetected = (suggestions: string) => {
        navigation.navigate('Suggestions', { suggestions });
    };

    return (
        <View style={styles.container}>
            <Scanner onObjectDetected={handleObjectDetected} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
});

export default ScannerScreen;
