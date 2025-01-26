import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import Navbar from './src/components/Navbar';
import ProductList from './src/components/ProductList';
import MenuButton from './src/components/MenuButton';

const SPACE_ID = 'gxz2kpjfag3c';
const ACCESS_TOKEN = 'bYq8sH_BpvozOhUgYIoBLxXdo0MAdbkdR1DrQJWDtMA';

const App = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isNavbarVisible, setNavbarVisible] = useState(false);

  const fetchProducts = () => {
    const url = `https://cdn.contentful.com/spaces/${SPACE_ID}/entries`;

    axios
      .get(url, {
        params: {
          access_token: ACCESS_TOKEN,
          content_type: 'products',
        },
      })
      .then(response => {
        setProducts(response.data.items);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  };

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
        console.log(response.data);
        setCategories(response.data.cates);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  };

  const toggleNavbar = () => {
    setNavbarVisible(!isNavbarVisible);
  };
  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Navbar
        isVisible={isNavbarVisible}
        onClose={toggleNavbar}
        categories={categories}
      />

      {/* <View style={styles.content}>
        <TouchableOpacity onPress={toggleNavbar} style={styles.menuButton}>
          <Text style={styles.menuText}>☰</Text>
        </TouchableOpacity>

        <View style={styles.container}>
          <Text style={styles.header}>Products</Text>
          <FlatList
            data={products}
            keyExtractor={item => item.fields.name}
            renderItem={({ item }) => (
              <View style={styles.productCard}>
                <Image
                  style={styles.image}
                  source={{ uri: item.fields.media }}
                />
                <Text style={styles.productName}>{item.fields.name}</Text>
                <Text style={styles.productPrice}>${item.fields.price}</Text>
              </View>
            )}
          />
        </View>
      </View> */}
      {/* <MenuButton onPress={toggleNavbar} /> */}
      <ProductList products={products} toggleNavbar={toggleNavbar} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    padding: 20,
  },

  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

});

export default App;
