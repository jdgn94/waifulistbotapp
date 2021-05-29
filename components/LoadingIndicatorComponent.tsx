import * as React from 'react';
import { View, ActivityIndicator, Dimensions, StyleSheet } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function loadingIndicatorComponent() {
  return (
    <View style={styles.container}>
      <ActivityIndicator
        size={40}
        color='#6200ee'
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width,
    height,
    backgroundColor: 'rgba(0, 0, 0, .3)',
  },
});