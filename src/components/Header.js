import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

const Header = ({ toggleNavbar, cartCount }) => (
  <View style={styles.header}>
    {/* Menu Button */}
    <TouchableOpacity onPress={toggleNavbar} style={styles.menuButton}>
      <Image
        source={require('../assets/menu.png')}
        style={styles.icon}
      />
    </TouchableOpacity>

    {/* Website Name */}
    <Text style={styles.websiteName}>ShopEasy</Text>

    {/* Cart Icon */}
    <TouchableOpacity style={styles.cartContainer} onPress={toggleNavbar} >
      <Image
        source={require('../assets/cart.png')}
        style={styles.icon}
      />
      {cartCount > 0 && <Text style={styles.cartCount}>{cartCount}</Text>}
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#000',
    padding: 15,
  },
  menuButton: {
    padding: 10,
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: '#fff',
  },
  websiteName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  cartContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartCount: {
    position: 'absolute',
    top: -5,
    right: -10,
    backgroundColor: 'red',
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    borderRadius: 50,
    paddingHorizontal: 5,
  },
});

export default Header;
