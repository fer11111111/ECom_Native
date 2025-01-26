import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { ShoppingCart } from 'lucide-react-native';

const AddToCartButton = ({ onPress }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <ShoppingCart size={20} color="#fff" />
    <Text style={styles.buttonText}>Add to Cart</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    marginLeft: 10,
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default AddToCartButton;
