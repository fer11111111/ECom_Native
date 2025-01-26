import React from 'react';
import { View, Text, Image, StyleSheet,TouchableOpacity } from 'react-native';


const ProductCard = ({ product, selectedProduct, setSelectedProduct}) => {
  if (selectedProduct) {
      console.log('Selected Product:', selectedProduct);
      return (
        <View style={styles.detailsContainer}>
          <TouchableOpacity onPress={() => setSelectedProduct(null)}>
            <Text style={styles.backButton}>← Back</Text>
          </TouchableOpacity>
          <Image
            source={{ uri: selectedProduct.fields.media }}
            style={styles.productImage}
          />
          <Text style={styles.productTitle}>{selectedProduct.fields.name}</Text>
          <Text style={styles.productDescription}>
            {selectedProduct.fields.description}
          </Text>
          <Text style={styles.productPrice}>
            Price: ${selectedProduct.fields.price}
          </Text>
        </View>
      );
    }
    return(
  <View style={styles.productCard}>
    <TouchableOpacity
        style={styles.productItem}
        onPress={() => setSelectedProduct(product)} // Set selected product
    >
        <Image style={styles.image} source={{ uri: product.fields.media }} />
        <Text style={styles.productName}>{product.fields.name}</Text>
        <Text style={styles.productPrice}>${product.fields.price}</Text>
        <TouchableOpacity style={styles.closeButton}>
          <Text style={styles.closeText}>BUY</Text>
        </TouchableOpacity>
    </TouchableOpacity>

  </View>
  );
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
  closeButton: {
    position: 'absolute',
    bottom: 1,
    width: '30%',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#262523',
    borderRadius: 10,
    left: 250,
  },
  closeText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ProductCard;
