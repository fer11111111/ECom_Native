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
import LottieView from 'lottie-react-native';
// import MenuButton from './src/components/MenuButton';
import Header from './src/components/Header';
import Game from './src/components/Game';

const SPACE_ID = 'gxz2kpjfag3c';
const ACCESS_TOKEN = 'bYq8sH_BpvozOhUgYIoBLxXdo0MAdbkdR1DrQJWDtMA';



const App = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isNavbarVisible, setNavbarVisible] = useState(false);
  const [isGameVisible, setGameVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

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
        // setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        // setLoading(false);
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
  const toggleGame = () => {
    setGameVisible(!isGameVisible);
  };
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 5000);
    fetchProducts();
    fetchCategories();
  }, []);


  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setLoading(false);
  //   }, 10000);
  //   return () => clearTimeout(timer);
  // }, []);

  if (loading) {
    return (
      <View style={styles.centered}>
        <LottieView
          source={require('./src/assets/loading-spinner.json')}
          autoPlay
          loop
          style={styles.lottieAnimation}
        />
      </View>
    );
  }

  // if (selectedProduct) {
  //   console.log('Selected Product:', selectedProduct);
  //   return (
  //     <View style={styles.detailsContainer}>
  //       <TouchableOpacity onPress={() => setSelectedProduct(null)}>
  //         <Text style={styles.backButton}>← Back</Text>
  //       </TouchableOpacity>
  //       <Image
  //         source={{ uri: selectedProduct.fields.media }}
  //         style={styles.productImage}
  //       />
  //       <Text style={styles.productTitle}>{selectedProduct.fields.name}</Text>
  //       <Text style={styles.productDescription}>
  //         {selectedProduct.fields.description}
  //       </Text>
  //       <Text style={styles.productPrice}>
  //         Price: ${selectedProduct.fields.price}
  //       </Text>
  //     </View>
  //   );
  // }
  if (!loading)
  {return (
    <View style={styles.container}>
      <Navbar
        isVisible={isNavbarVisible}
        onClose={toggleNavbar}
        categories={categories}
      />
      {/* <Game isVisible={isGameVisible} onClose={toggleGame} toggleGame={toggleGame} />
      <Navbar
        isVisible={isGameVisible}
        onClose={toggleGame}
      /> */}
      <Header toggleNavbar={toggleNavbar} />
      <ProductList products={products} selectedProduct={selectedProduct} setSelectedProduct={setSelectedProduct} />
    </View>
  );}
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
    backgroundColor: '#232323',
  },

  detailsContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  backButton: {
    fontSize: 16,
    color: '#007BFF',
    marginBottom: 20,
  },
  productImage: {
    width: '100%',
    height: 300,
    marginBottom: 20,
    borderRadius: 8,
  },
  productTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  productDescription: {
    fontSize: 16,
    marginBottom: 20,
    color: '#555',
  },
  productPrice: {
    fontSize: 20,
    fontWeight: '600',
    color: '#4CAF50',
  },
  lottieAnimation: {
    width: 150,
    height: 150,
  },
});

export default App;
