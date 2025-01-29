// CartPage.js
import React, { useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { useCart } from '../CartContext';

const CartPage = () => {
  const { cart, incrementCount, decrementCount, removeFromCart, calculateTotal, applyPromoCode, proceedToPayment, promoCode } = useCart();
  const [enteredPromoCode, setEnteredPromoCode] = useState('');

  const originalPrice = cart.reduce((acc, item) => acc + item.fields.price * item.count, 0) || 0;
  const discount = applyPromoCode(enteredPromoCode) || 0;
  const discountedPrice = originalPrice - discount;

  const handlePromoCodeChange = (e) => {
    setEnteredPromoCode(e);
  };

  const handleApplyPromoCode = () => {
    setEnteredPromoCode('');
    applyPromoCode(enteredPromoCode);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Cart</Text>
      {cart.length === 0 ? (
        <Text style={styles.emptyCart}>Your cart is empty!</Text>
      ) : (
        <FlatList
          data={cart}
          keyExtractor={(item) => item.fields.name}
          renderItem={({ item }) => (
            <View style={styles.cartItem}>
              <Image source={{ uri: item.fields.media }} style={styles.productImage} />
              <View style={styles.productInfo}>
              <Text style={styles.productName}>{item.fields.name}</Text>
              <Text style={styles.productPrice}>Price: ₹{item.fields.price}</Text>
              <View style={styles.quantityContainer}>
                <TouchableOpacity onPress={() => decrementCount(item.fields.name)}>
                  <Text style={styles.quantityButton}>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantity}>{item.count}</Text>
                <TouchableOpacity onPress={() => incrementCount(item.fields.name)}>
                  <Text style={styles.quantityButton}>+</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity onPress={() => removeFromCart(item.fields.name)}>
                <Text style={styles.removeButton}>Remove</Text>
              </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}

      <View style={styles.promoContainer}>
        <Text>Enter Promo Code</Text>
        <TextInput
          style={styles.promoInput}
          placeholder="Enter Promo Code"
          value={enteredPromoCode}
          onChangeText={handlePromoCodeChange}
        />
        <TouchableOpacity onPress={handleApplyPromoCode}>
          <Text style={styles.applyButton}>Apply</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.totalContainer}>
      <Text style={styles.totalText}>Total:</Text>
      <Text style={styles.totalPrice}>₹{discountedPrice.toFixed(2)}</Text>
      </View>
      <View style={styles.totalContainer}>
      <Text style={styles.totalText}>Discount:</Text>
      <Text style={styles.totalPrice}>₹{(discountedPrice - calculateTotal()).toFixed(2)}</Text>
      </View>
      <View style={styles.totalContainer}>
      <Text style={styles.totalText}>Discounted Price:</Text>
      <Text style={styles.totalPrice}>₹{calculateTotal().toFixed(2)}</Text>
      </View>

      <TouchableOpacity onPress={proceedToPayment} style={styles.paymentButton}>
        <Text style={styles.paymentText}>Proceed to Payment</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  emptyCart: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 50,
    color: '#888',
  },
  cartItem: {
    flexDirection: 'row',
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 10,
  },
  productInfo: {
    flex: 1,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 15,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 16,
    marginVertical: 5,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  quantityButton: {
    fontSize: 18,
    padding: 10,
    backgroundColor: '#ddd',
    borderRadius: 5,
    marginHorizontal: 5,
  },
  quantity: {
    fontSize: 18,
    marginHorizontal: 10,
  },
  removeButton: {
    color: '#ff3333',
    marginTop: 10,
    fontWeight: 'bold',
  },
  promoContainer: {
    marginTop: 20,
    alignItems: 'center',
    fontStyle: {color:'red'},
  },
  promoInput: {
    height: 40,
    width: '80%',
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  applyButton: {
    marginTop: 10,
    color: '#007bff',
    fontWeight: 'bold',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    width: '100%',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  total: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  paymentButton: {
    marginTop: 30,
    backgroundColor: '#007bff',
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  paymentText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CartPage;
