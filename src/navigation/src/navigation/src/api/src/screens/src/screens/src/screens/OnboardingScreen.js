import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { colors } from '../theme/colors';

const OnboardingScreen = ({ navigation }) => (
  <SafeAreaView style={styles.container}>
    <Text style={styles.title}>Welcome to ICaptivate</Text>
    <Text style={styles.subtitle}>Your AI communication assistant</Text>
    <TouchableOpacity style={styles.button} onPress={() => navigation.replace('Auth')}>
      <Text style={styles.buttonText}>Get Started</Text>
    </TouchableOpacity>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', padding: 20 },
  title: { fontSize: 28, fontWeight: 'bold', color: colors.primary, marginBottom: 16 },
  subtitle: { fontSize: 18, color: colors.textSecondary, marginBottom: 40, textAlign: 'center' },
  button: { backgroundColor: colors.primary, padding: 16, borderRadius: 12, width: '100%', alignItems: 'center' },
  buttonText: { color: 'white', fontSize: 18, fontWeight: 'bold' }
});

export default OnboardingScreen;
