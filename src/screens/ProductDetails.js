import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useProductContext } from '../ProductContext';
import { useCart } from '../CartContext';
import { useNavigation } from '@react-navigation/native';

const ProductDetails = () => {
  const { selectedProduct } = useProductContext();
  const { incrementCount, decrementCount, addToCart, removeFromCart, cart } = useCart();
  const navigation = useNavigation();

  if (!selectedProduct) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No product selected.</Text>
      </View>
    );
  }

  const cartItem = cart.find((item) => item.fields.name === selectedProduct.fields.name);
  const itemCount = cartItem ? cartItem.count : 0;

  return (
    <View style={styles.container}>
      {/* Back to Home Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>←</Text>
      </TouchableOpacity>

      <View style={styles.card}>
        <Image source={{ uri: selectedProduct.fields.media }} style={styles.image} />
        <View style={styles.productInfo}>
          <Text style={styles.name}>{selectedProduct.fields.name}</Text>
          <Text style={styles.price}>₹{selectedProduct.fields.price}</Text>
          <Text style={styles.description}>{selectedProduct.fields.description}</Text>
        </View>

        {/* Cart Controls */}
        <View style={styles.cartControls}>
          {itemCount > 0 ? (
            <>
              <TouchableOpacity
                style={[styles.cartButton, styles.decrementButton]}
                onPress={() => decrementCount(selectedProduct.fields.name)}
              >
                <Text style={styles.buttonText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.itemCount}>{itemCount}</Text>
              <TouchableOpacity
                style={[styles.cartButton, styles.incrementButton]}
                onPress={() => incrementCount(selectedProduct.fields.name)}
              >
                <Text style={styles.buttonText}>+</Text>
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity
              style={styles.addToCartButton}
              onPress={() => addToCart(selectedProduct)}
            >
              <Text style={styles.addToCartText}>Add to Cart</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Remove from Cart Button */}
        {itemCount > 0 && (
          <TouchableOpacity
            style={styles.removeFromCartButton}
            onPress={() => removeFromCart(selectedProduct.fields.name)}
          >
            <Text style={styles.removeFromCartText}>Remove from Cart</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f9fa',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    width: '95%',
    alignSelf: 'center',
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 8,
    marginBottom: 16,
  },
  productInfo: {
    alignItems: 'flex-start',
    width: '100%',
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'left',
  },
  price: {
    fontSize: 20,
    color: '#4CAF50',
    marginBottom: 8,
    textAlign: 'left',
  },
  description: {
    fontSize: 16,
    color: '#555',
    textAlign: 'left',
    marginBottom: 16,
  },
  cartControls: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  cartButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  incrementButton: {
    backgroundColor: '#007BFF',
  },
  decrementButton: {
    backgroundColor: '#FF5722',
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  itemCount: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 12,
  },
  addToCartButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 16,
  },
  addToCartText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  removeFromCartButton: {
    marginTop: 16,
    backgroundColor: '#DC3545',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  removeFromCartText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  backButton: {
    position: 'absolute',
    top: 16,
    left: 16,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#fff',
    zIndex: 1,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  },
});

export default ProductDetails;
