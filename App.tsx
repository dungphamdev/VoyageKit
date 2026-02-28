import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import ScannerScreen from './src/screens/ScannerScreen';
import SuggestionsScreen from './src/screens/SuggestionsScreen';
import { COLORS } from './src/constants/theme';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: COLORS.background },
        }}
      >
        <Stack.Screen name="Scanner" component={ScannerScreen} />
        <Stack.Screen name="Suggestions" component={SuggestionsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
