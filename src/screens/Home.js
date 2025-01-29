import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';
import Navbar from '../components/Navbar';
import ProductList from '../components/ProductList';
import Header from '../components/Header';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';
import BannerSlider from '../components/BannerSlider';

const SPACE_ID = 'gxz2kpjfag3c';
const ACCESS_TOKEN = 'bYq8sH_BpvozOhUgYIoBLxXdo0MAdbkdR1DrQJWDtMA';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isNavbarVisible, setNavbarVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');

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
      })
      .catch(error => {
        console.error('Error fetching data:', error);
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
        setCategories(response.data.items);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  };

  const toggleNavbar = () => {
    setNavbarVisible(!isNavbarVisible);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setNavbarVisible(false);
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
    fetchProducts();
    fetchCategories();
  }, []);

  if (loading) {
    return (
      <View style={styles.centered}>
        <LottieView
          source={require('../assets/loading-spinner.json')}
          autoPlay
          loop
          style={styles.lottieAnimation}
        />
      </View>
    );
  }

  // Filter products based on selected category
  const filteredProducts = selectedCategory === 'All'
    ? products
    : products.filter(product =>
        product.fields.categoryName === selectedCategory
      );

  return (
    <View style={styles.container}>
      <Navbar
        isVisible={isNavbarVisible}
        onClose={toggleNavbar}
        toggleNavbar={toggleNavbar}
        onCategorySelect={handleCategorySelect} // Pass handler to navbar
      />
      <Header toggleNavbar={toggleNavbar} products={filteredProducts} />
      {/* <View style={[styles.headerView, styles.overlay]}>
        <Text style={styles.header}>Featured Products</Text>
      </View> */}
      <BannerSlider />
      <ProductList products={filteredProducts} category={selectedCategory} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#232323',
  },
  headerView: {
    width: '100%',
    padding: 16,
    marginTop: 70,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0, // Position at the top of the screen
    left: 0,
    zIndex: 10, // Ensure it is above other elements
  },
  header: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  lottieAnimation: {
    width: 150,
    height: 150,
  },
});

export default Home;
