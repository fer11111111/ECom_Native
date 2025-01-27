import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, FlatList } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const SPACE_ID = 'gxz2kpjfag3c';
const ACCESS_TOKEN = 'bYq8sH_BpvozOhUgYIoBLxXdo0MAdbkdR1DrQJWDtMA';

const Navbar = ({ isVisible, onClose, toggleNavbar, onCategorySelect }) => {
  const [categories, setCategories] = useState([]);
  const navigation = useNavigation();

  const fetchCategories = () => {
    const url = `https://cdn.contentful.com/spaces/${SPACE_ID}/entries`;

    axios
      .get(url, {
        params: {
          access_token: ACCESS_TOKEN,
          content_type: 'category',
        },
      })
      .then(response => {
        setCategories(response.data.items); // Ensure this matches the correct data structure
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.menuPanel}>
          <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Home')}>
            <Text style={styles.menuItemText}>Home {'>'}</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Categories</Text>
          <FlatList
            data={categories}
            keyExtractor={(item) => item.fields.categoryName}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => {
                  onCategorySelect(item.fields.categoryName);
                }}
              >
                <Text style={styles.menuItemText}>
                  {item.fields.categoryName} {'>'}
                </Text>
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
