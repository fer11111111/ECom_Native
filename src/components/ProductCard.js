import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const ProductCard = ({ product }) => (
  <View style={styles.productCard}>
    <Image style={styles.image} source={{ uri: product.fields.media }} />
    <Text style={styles.productName}>{product.fields.name}</Text>
    <Text style={styles.productPrice}>${product.fields.price}</Text>
  </View>
);

const styles = StyleSheet.create({
  productCard: {
    marginBottom: 20,
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    borderWidth: 2,
    borderColor: '#000',
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 8,
    marginBottom: 10,
  },
  productName: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: '400',
    color: '#4CAF50',
  },
});

export default ProductCard;
