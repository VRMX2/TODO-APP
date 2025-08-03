import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

const SettingsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Settings</Text>
      <Text style={styles.description}>Customize your preferences here.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc", 
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    fontSize: 26,
    fontWeight: "700",
    color: "#0f172a",
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: "#475569",
    textAlign: "center",
  },
});

export default SettingsScreen;
