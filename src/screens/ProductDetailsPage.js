// ProductDetailsPage.js
import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';

const ProductDetailsPage = () => {
  const route = useRoute();
  const { product } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image style={styles.productImage} source={{ uri: product.fields.media }} />
      <Text style={styles.productName}>{product.fields.name}</Text>
      <Text style={styles.productCategory}>{product.fields.categoryName}</Text>
      <Text style={styles.productPrice}>₹{product.fields.price}</Text>
      <Text style={styles.productDescription}>{product.fields.description}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  productImage: {
    width: '100%',
    height: 400,
    borderRadius: 8,
    marginBottom: 20,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  productCategory: {
    fontSize: 18,
    fontStyle: 'italic',
    color: '#888',
    marginBottom: 10,
  },
  productPrice: {
    fontSize: 22,
    color: '#4CAF50',
    marginBottom: 15,
  },
  productDescription: {
    fontSize: 16,
    lineHeight: 24,
    color: '#555',
  },
});

export default ProductDetailsPage;
