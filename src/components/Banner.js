import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const Banner = () => {
  return (
    <View style={styles.bannerContainer}>
      <Image
        source={require('../assets/banner1.jpg')} // Replace with your banner image path
        style={styles.bannerImage}
        resizeMode="cover"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  bannerContainer: {
    width: '100%',
    height: 200, // Adjust height as needed
    marginBottom: 20, // Adjust margin as needed
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8, // Optional: Add border radius for rounded corners
  },
});

export default Banner;
