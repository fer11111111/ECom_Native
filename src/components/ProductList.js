import React from 'react';
import { FlatList, View } from 'react-native';
import ProductCard from './ProductCard';

const ProductList = ({ products, selectedProduct, setSelectedProduct}) => (
  <View>
    <FlatList
      data={products}
      keyExtractor={(item) => item.fields.name}
      renderItem={({ item }) => <ProductCard product={item} selectedProduct={selectedProduct} setSelectedProduct={setSelectedProduct}/>}
    />
  </View>
);


export default ProductList;
