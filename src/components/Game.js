// src/components/Navbar.js
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Modal, FlatList } from 'react-native';

const Game = ({ isVisible, onClose, toggleGame }) => {
  return (
    <TouchableOpacity onPress={toggleGame} style={styles.overlay}>
        <Image
            source={require('../assets/menu.png')}
            style={styles.icon}
        />
        <Text style={styles.closeText}>Game</Text>
    </TouchableOpacity>

  );
};

const styles = StyleSheet.create({
  overlay: {
    width: '100%',
    padding: 10,
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    opacity: 0.8,
    zIndex: 10,
  },
  menuPanel: {
    width: '20%',
    height: '100%',
    backgroundColor: '#fff',
    padding: 20,
    paddingTop: 100,
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 50,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 10 },
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  menuItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  menuItemText: {
    fontSize: 18,
    color: '#333',
  },
  closeButton: {
    position: 'absolute',
    bottom: 30,
    width: '100%',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#262523',
    borderRadius: 10,
    left: 20,
  },
  closeText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Game;
