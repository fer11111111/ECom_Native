import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const MenuButton = ({ onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.menuButton}>
    <Text style={styles.menuText}>☰</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  menuButton: {
    position: 'absolute',
    top: 30,
    backgroundColor: '#000',
    padding: 10,
    borderRadius: 50,
    zIndex: 1,
  },
  menuText: {
    fontSize: 24,
    color: '#fff',
  },
});

export default MenuButton;
