import React from 'react';
import { StyleSheet, View } from 'react-native';
import PolarCoordinate from './components/PolarCoordinate';

export default function App() {
  return (
    <View style={styles.container}>
      {/* Render the PolarCoordinate component */}
      <PolarCoordinate speed={500} />
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
});
