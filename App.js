import { StyleSheet, Text, View } from 'react-native';
import PolarCoordinate from './components/PolarCoordinate';

export default function App() {
  return (
    <View style={styles.container}>
      <PolarCoordinate speed={500} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
