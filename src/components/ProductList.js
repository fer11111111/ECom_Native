import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import ProductCard from './ProductCard';
import Header from './Header';

const ProductList = ({ products, toggleNavbar }) => (
  <View>
    <Header toggleNavbar={toggleNavbar}/>
    <FlatList
      data={products}
      keyExtractor={(item) => item.fields.name}
      renderItem={({ item }) => <ProductCard product={item} />}
    />
  </View>
);

const styles = StyleSheet.create({
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    left: 40,
    borderBottomColor: '#000',
    borderBottomWidth: 1,
  },
});

export default ProductList;
