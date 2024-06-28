import React from 'react';
import {View, StyleSheet, Image, Text, ActivityIndicator} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

// Import the images from the assets
import clock from '../assets/clock.png';
import appName from '../assets/app_name.png';
import splashBottomShape from '../assets/splash_bottom_shape.png';

export default function SplashScreenView() {
  return (
    <>
      <LinearGradient
        colors={['#041822', '#07262f']}
        style={styles.container}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}>
        <View style={styles.imageContainer}>
          <Image source={clock} style={{height: 70, width: 70}} />
          <Image source={appName} style={styles.appName} />
          <Text style={styles.tagline}>EASIEST PRODUCTIVITY APP EVER</Text>
          <ActivityIndicator
            size={40}
            color="#b85665"
            style={styles.activityIndicator}
          />
        </View>
        <Image source={splashBottomShape} style={styles.bottomImage} />
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    position: 'relative', // Added for positioning absolute child
  },
  imageContainer: {
    marginTop: 220,
    alignItems: 'center',
  },
  appName: {
    marginTop: 20,
    height: 18,
    width: 150,
    resizeMode: 'contain',
  },
  tagline: {
    marginTop: 10,
    color: '#ffffff',
    fontSize: 14,
    textAlign: 'center',
  },
  activityIndicator: {
    marginTop: 40,
  },
  bottomImage: {
    position: 'absolute', // Positioning the image absolutely
    bottom: 0,
    width: '100%',
    height: '32%', // Adjust the height as per the image aspect ratio
    resizeMode: 'contain',
  },
});
