import React, { useRef } from 'react';
import { View, Dimensions, StyleSheet, Image,Text } from 'react-native';
import Carousel from 'react-native-snap-carousel';

const { width } = Dimensions.get('window');

const BannerSlider = () => {
  const carouselRef = useRef(null);

  const banners = [
    { id: '1', image: require('../assets/banner1.jpg') },
    { id: '2', image: require('../assets/banner2.jpg') },
    { id: '3', image: require('../assets/banner2.jpg') },
    { id: '4', image: require('../assets/banner1.jpg') },
  ];

  const renderBanner = ({ item }) => (
    <View style={styles.bannerContainer}>
      <Image source={item.image} style={styles.bannerImage} resizeMode="cover" />
    </View>
  );

  return (
    <View style={styles.container}>
      {banners.length > 0 ? (
        <Carousel
          ref={carouselRef}
          data={banners}
          renderItem={renderBanner}
          sliderWidth={width}
          itemWidth={width}
          loop
          autoplay
          autoplayDelay={2000}
          autoplayInterval={4000}
        />
      ) : (
        <View>
          <Text style={styles.errorText}>No banners available</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20, // Add spacing between the carousel and other content
  },
  bannerContainer: {
    width: width,
    height: 200, // Adjust based on the desired banner height
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10, // Optional: Rounded corners
  },
  errorText: {
    textAlign: 'center',
    fontSize: 16,
    color: 'red',
  },
});

export default BannerSlider;
