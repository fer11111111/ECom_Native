// src/components/Navbar.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, FlatList } from 'react-native';

const Navbar = ({ isVisible, onClose, categories }) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.menuPanel}>
          <Text style={styles.title}>Categories</Text>
          <FlatList
            data={categories}
            keyExtractor={(item) => item.fields.categoryName}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.menuItem}>
                <Text style={styles.menuItemText}>{item.categoryName}</Text>
              </TouchableOpacity>
            )}
          />
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    opacity: 0.8,
  },
  menuPanel: {
    width: '70%',
    height: '100%',
    backgroundColor: '#fff',
    padding: 20,
    paddingTop: 60,
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: -4, height: 0 },
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

export default Navbar;
