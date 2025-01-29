// Search.js
import React, { useState, useEffect, useMemo } from 'react';
import {
  View,
  TextInput,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useProductContext } from '../ProductContext';

const Search = () => {
  const { selectedProduct, setSelectedProduct } = useProductContext();
  const [searchText, setSearchText] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const navigation = useNavigation();

  const products = useMemo(() => [
    { fields: { name: 'Laptop', price: 75000, media: 'https://m.media-amazon.com/images/I/510uTHyDqGL.jpg' } },
    { fields: { name: 'Headphones', price: 2000, media: 'https://images-cdn.ubuy.co.in/64dc7605341db0703c1dd064-noise-cancelling-bluetooth-headphones.jpg' } },
    { fields: { name: 'Keyboard', price: 1000, media: 'https://m.media-amazon.com/images/I/71pHnBCAqmL.jpg' } },
  ], []);

  useEffect(() => {
    if (searchText.trim() === '') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((product) =>
        product.fields.name.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [searchText, products]);

  const handleSearch = (text) => {
    setSearchText(text);
  };

  const handleProductPress = (product) => {
    setSelectedProduct(product);
    navigation.navigate('ProductDetails');
  };

  const renderProduct = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => handleProductPress(item)}
    >
      <Image source={{ uri: item.fields.media }} style={styles.image} />
      <Text style={styles.name}>{item.fields.name}</Text>
      <Text style={styles.price}>₹{item.fields.price}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Search Input */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search products..."
        value={searchText}
        onChangeText={handleSearch}
      />

      {/* Product List */}
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.fields.name}
        renderItem={renderProduct}
        numColumns={2}
        contentContainerStyle={styles.productList}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No products found.</Text>
        }
      />
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 10,
  },
  searchInput: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  productList: {
    paddingBottom: 20,
  },
  card: {
    flex: 1,
    margin: 5,
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 2,
    alignItems: 'center',
    padding: 10,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  price: {
    fontSize: 14,
    color: '#888',
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#888',
    marginTop: 20,
  },
});
