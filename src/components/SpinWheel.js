import React, { useState, useRef } from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity, Animated, Image } from 'react-native';
// import { useRoute } from '@react-navigation/native';

const SpinWheel = ({ visible, onClose }) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedPrize, setSelectedPrize] = useState(null);
  const spinValue = useRef(new Animated.Value(0)).current;

  const prizes = [
    'Free Coffee',
    'Discount Coupon 20%',
    'Gift Card ₹500',
    'Free Shipping',
    'Bonus Points',
    '50% Off on Next Purchase',
  ];

  const startSpin = () => {
    setIsSpinning(true);
    setSelectedPrize(null);
    spinValue.setValue(0);

    Animated.timing(spinValue, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true,
    }).start(() => {

      setIsSpinning(false);
      const randomPrize = prizes[Math.floor(Math.random() * prizes.length)];
      setSelectedPrize(randomPrize);
    });
  };


  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '899deg'],
  });

  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.spinWheelContainer}>
          <Text style={styles.title}>Spin the Wheel!</Text>

          <Animated.View
            style={[styles.wheelContainer, { transform: [{ rotate: spin }] }]}
          >
            <Image
              source={require('../assets/spin-wheel.png')}
              style={styles.wheelImage}
              resizeMode="contain"
            />
          </Animated.View>

          <View style={styles.prizeContainer}>

            {selectedPrize ? (
              <>
                <Text style={styles.arrow}>↑</Text>
                <Text style={styles.selectedPrize}>You won: {selectedPrize}</Text>
              </>
            ) : (
              <Text style={styles.spinnerText}>
                {isSpinning ? 'Spinning...' : 'Spin to Win'}
              </Text>
            )}
          </View>


          <TouchableOpacity onPress={startSpin} style={styles.button}>
            <Text style={styles.buttonText}>Spin</Text>
          </TouchableOpacity>


          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  spinWheelContainer: {
    width: 300,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  wheelContainer: {
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  wheelImage: {
    width: '100%',
    height: '100%',
  },
  spinnerText: {
    fontSize: 18,
    marginBottom: 20,
  },
  selectedPrize: {
    fontSize: 18,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  prizeContainer: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrow: {
    position: 'absolute',
    top: -75,
    fontSize: 70,
    color: '#333',
  },
  button: {
    width: 70,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#28a745',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  closeButton: {
    width: 70,
    marginTop: 20,
    paddingVertical: 10,
    backgroundColor: '#dc3545',
    borderRadius: 5,
  },
  closeText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default SpinWheel;
