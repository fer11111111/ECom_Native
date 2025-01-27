import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import ProductCard from './ProductCard';

const ProductList = ({ products, category}) => (
  <View>
    <FlatList
      data={products}
      keyExtractor={(item) => item.fields.name}
      contentContainerStyle={styles.contentContainerStyle}
      renderItem={({ item }) => <ProductCard product={item} category={category}/>}
    />
  </View>
);

const styles = StyleSheet.create({
  contentContainerStyle: {
    paddingTop: 70,
    paddingBottom: 120,
    },
});

export default ProductList;
