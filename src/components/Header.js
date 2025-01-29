import React,{useState,useEffect} from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
const SPACE_ID = 'gxz2kpjfag3c';
const ACCESS_TOKEN = 'bYq8sH_BpvozOhUgYIoBLxXdo0MAdbkdR1DrQJWDtMA';

const Header = ({ toggleNavbar, cartCount, items }) => {
  const [products, setProducts] = useState([]);
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
  const navigation = useNavigation();

  useEffect(() => {
      fetchProducts();
    }, []);

  return(
  <View style={styles.header}>

    <TouchableOpacity onPress={toggleNavbar} style={styles.menuButton}>
      <Image
        source={require('../assets/menu.png')}
        style={styles.icon}
      />
    </TouchableOpacity>

    <TouchableOpacity style={styles.cartContainer} onPress={() => navigation.navigate('Home') } >
      <Image
        source={require('../assets/logo1.png')}
        style={styles.icon2}
      />
    </TouchableOpacity>
    <Text style={styles.websiteName}>ShopEasy</Text>

    <TouchableOpacity style={styles.cartContainer} onPress={() => navigation.navigate('Search', items) } >
      <Image
        source={require('../assets/search.png')}
        style={styles.icon}
      />
    </TouchableOpacity>

    <TouchableOpacity style={styles.cartContainer} onPress={() => navigation.navigate('Cart') } >
      <Image
        source={require('../assets/cart.png')}
        style={styles.icon}
      />
      {cartCount > 0 && <Text style={styles.cartCount}>{cartCount}</Text>}
    </TouchableOpacity>
  </View>
);
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#232323',
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
  icon2: {
    width: 45,
    height: 45,
    // tintColor: '#fff',
  },
  websiteName: {
    fontSize: 22,
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
