import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useIsFocused} from '@react-navigation/native';
import Header from '../components/Header';
import ActivityList from '../components/ActivityList';
import BottomNavigation from '../components/BottomNavigation';

export default function HomeScreen() {
  const isFocused = useIsFocused();

  return (
    <LinearGradient
      colors={['#041822', '#07262f']}
      style={styles.container}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}>
      <Header />
      <Image
        source={require('../assets/instructions.png')}
        style={styles.instruction}
      />
      <View style={styles.listContainer}>
        <ActivityList isFocused={isFocused} />
      </View>
      <BottomNavigation screenName={'Home'} />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  instruction: {
    width: 200,
    height: 60,
    resizeMode: 'contain',
    marginTop: 20,
  },
  listContainer: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 10,
    paddingBottom: 100,
  },
});
