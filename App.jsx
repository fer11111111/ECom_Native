import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

import LottieView from 'lottie-react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { CartProvider } from './src/CartContext';
import { ProductProvider } from './src/ProductContext';
import SpinWheel from './src/components/SpinWheel';
import Home from './src/screens/Home';
import CartPage from './src/components/CartPage';
import ProductDetails from './src/screens/ProductDetails';

// const SPACE_ID = 'gxz2kpjfag3c';
// const ACCESS_TOKEN = 'bYq8sH_BpvozOhUgYIoBLxXdo0MAdbkdR1DrQJWDtMA';

const Stack = createStackNavigator();

const App = () => {
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);

  const toggleOverlay = () => {
    setIsOverlayVisible(!isOverlayVisible);
  };
  return (
    <ProductProvider>
    <CartProvider>
      <NavigationContainer>
        <SafeAreaView style={{ flex: 1 }}>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="ProductDetails" component={ProductDetails} />
            <Stack.Screen name="Cart" component={CartPage} />
          </Stack.Navigator>
          
          <SpinWheel visible={isOverlayVisible} onClose={toggleOverlay} />

          <TouchableOpacity
            style={styles.overlayButton}
            onPress={toggleOverlay}>
            <Text style={styles.buttonText}>Spin the Wheel</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </NavigationContainer>
    </CartProvider>
    </ProductProvider>

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
    backgroundColor: '#000',
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
  overlayButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#ff6f61',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 50,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default App;
