import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  Image,
  FlatList,
  StyleSheet,
  Dimensions,
  Animated,
  TouchableOpacity,
} from 'react-native';

const {width} = Dimensions.get('window');

const BannerSlider = () => {
  const banners = [
    {
      id: '1',
      image:
        'https://img.freepik.com/free-vector/flat-horizontal-banner-template-black-friday-sale_23-2150852978.jpg',
    },
    {
      id: '2',
      image:
        'https://www.shutterstock.com/image-vector/3d-yellow-great-discount-sale-260nw-2056851839.jpg',
    },
    {
      id: '3',
      image:
        'https://img.freepik.com/free-psd/horizontal-banner-online-fashion-sale_23-2148585404.jpg',
    },
  ];

  const flatListRef = useRef(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % banners.length;
      setCurrentIndex(nextIndex);
      flatListRef.current?.scrollToIndex({index: nextIndex, animated: true});
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex, banners.length]);

  const handleScroll = Animated.event(
    [{nativeEvent: {contentOffset: {x: scrollX}}}],
    {useNativeDriver: false},
  );

  const pagination = banners.map((_, index) => {
    const opacity = scrollX.interpolate({
      inputRange: [(index - 1) * width, index * width, (index + 1) * width],
      outputRange: [0.3, 1, 0.3],
      extrapolate: 'clamp',
    });

    return <Animated.View key={index} style={[styles.dot, {opacity}]} />;
  });

  return (
    <View style={styles.carouselContainer}>
      <FlatList
        ref={flatListRef}
        data={banners}
        keyExtractor={item => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        renderItem={({item}) => (
          <View style={styles.bannerContainer}>
            <TouchableOpacity>
                <Image source={{uri: item.image}} style={styles.bannerImage} />
            </TouchableOpacity>
            {/* <Image source={{uri: item.image}} style={styles.bannerImage} /> */}
          </View>
        )}
      />
      <View style={styles.paginationContainer}>{pagination}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  carouselContainer: {
    position: 'relative',
  },
  bannerContainer: {
    width,
    height: 200,
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  paginationContainer: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#007bff',
    marginHorizontal: 4,
  },
});

export default BannerSlider;
