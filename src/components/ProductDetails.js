import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const ProductDetails = ({ route }) => {
  const { product } = route.params;

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: product.fields.media }} />
      <Text style={styles.productName}>{product.fields.name}</Text>
      <Text style={styles.productPrice}>${product.fields.price}</Text>
      <Text style={styles.productDescription}>{product.fields.description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 8,
    marginBottom: 10,
  },
  productName: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 18,
    fontWeight: '500',
    color: '#4CAF50',
    marginBottom: 10,
  },
  productDescription: {
    fontSize: 16,
    fontWeight: '400',
    color: '#333',
  },
});

export default ProductDetails;
