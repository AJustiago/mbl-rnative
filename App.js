import React from 'react';
import { StyleSheet, View } from 'react-native';
import BallRoute from './components/BallRoute';
import PolarCoordinate from './components/PolarCoordinate';

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.ballContainer}>
        <BallRoute speed={500} />
      </View>
      <View style={styles.polarContainer}>
        <PolarCoordinate speed={500} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ballContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
  polarContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 0,
  },
});
