import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useCart } from '../CartContext';
import { useProductContext } from '../ProductContext';

const ProductCard = ({ product, category }) => {
  const navigation = useNavigation();
  const { addToCart, cart } = useCart();
  const [addedToCart, setAddedToCart] = useState(false);
  // const [products, setProducts] = useState([]);
  // const navigation = useNavigation();
  const { setSelectedProduct } = useProductContext();

  const goToDetails = (product) => {
    setSelectedProduct(product); // Set selected product in context
    navigation.navigate('ProductDetails'); // Navigate to details page
  };

  // Check if the product is already in the cart
  useEffect(() => {
    const isInCart = cart.some((item) => item.fields.name === product.fields.name);
    setAddedToCart(isInCart);
  }, [cart, product]);

  const handleBuy = () => {
    addToCart(product); // Add product to the cart when the button is clicked
    setAddedToCart(true); // Mark the product as added to cart
  };

  const goToCart = () => {
    navigation.navigate('Cart'); // Navigate to Cart page
  };

  const categoryName = product.fields.categoryName;
  if (category) {
    return (
      <View style={styles.productCard}>
        <TouchableOpacity
          style={styles.productItem}
          onPress={() => goToDetails(product)} // Navigate to product details page
        >
          <Image style={styles.image} source={{ uri: product.fields.media }} />
          <Text style={styles.productName}>{product.fields.name}</Text>
          <Text style={styles.productPrice}>₹{product.fields.price}</Text>
          {/* <Text style={styles.productCategory}>{category}</Text> */}
          {addedToCart ? (
            <TouchableOpacity style={styles.buyButton} onPress={goToCart}>
              <Text style={styles.goToCartText}>Go to Cart &gt;</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.buyButton} onPress={handleBuy}>
              <Text style={styles.buyText}>Buy</Text>
            </TouchableOpacity>
          )}
        </TouchableOpacity>
      </View>
    );
  }

  return null; // If no category is passed, return null
};

const styles = StyleSheet.create({
  productCard: {
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    borderWidth: 2,
    borderColor: '#000',
    position: 'relative',
    // top: 5,
    // bottom: 1000,
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 8,
    marginBottom: 10,
  },
  productName: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: '400',
    color: '#4CAF50',
  },
  productCategory: {
    fontSize: 14,
    color: '#888',
    marginBottom: 10,
  },
  buyButton: {
    position: 'absolute',
    bottom: 5,
    width: '30%',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#262523',
    borderRadius: 10,
    left: '70%',
  },
  buyText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold',
  },
  goToCartText: {
    fontSize: 13,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ProductCard;
