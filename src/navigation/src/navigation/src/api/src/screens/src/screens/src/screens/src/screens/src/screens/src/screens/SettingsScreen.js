import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';

const SettingsScreen = () => (
  <View style={styles.container}>
    <Text style={styles.text}>Settings Screen - Coming Soon</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: colors.background 
  },
  text: { 
    fontSize: 18, 
    color: colors.primary, 
    fontWeight: 'bold' 
  }
});

export default SettingsScreen;
