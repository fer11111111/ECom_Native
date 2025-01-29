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

  const goToDetails = (prod) => {
    setSelectedProduct(prod);
    navigation.navigate('ProductDetails');
  };

  useEffect(() => {
    const isInCart = cart.some((item) => item.fields.name === product.fields.name);
    setAddedToCart(isInCart);
  }, [cart, product]);

  const handleBuy = () => {
    addToCart(product);
    setAddedToCart(true);
  };

  const goToCart = () => {
    navigation.navigate('Cart');
  };

  const categoryName = product.fields.categoryName;
  if (category) {
    return (
      <View style={styles.productCard}>
        <TouchableOpacity
          style={styles.productItem}
          onPress={() => goToDetails(product)}
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

  return null;
};

const styles = StyleSheet.create({
  productCard: {
    flex: 1,
    margin: 10,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    padding: 10,
    alignItems: 'center',
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 10,
    marginBottom: 10,
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    // textAlign: 'center',
    marginBottom: 5,
    color: '#333',
  },
  productPrice: {
    fontSize: 14,
    fontWeight: '500',
    color: '#4CAF50',
    marginBottom: 10,
  },
  buyButton: {
    width: 80,
    alignItems: 'center',
    paddingVertical: 8,
    backgroundColor: '#262523',
    borderRadius: 5,
    marginTop: 10,
  },
  buyText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold',
  },
  goToCartText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ProductCard;
