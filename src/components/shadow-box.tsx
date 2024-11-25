import React from 'react';
import {View, StyleSheet} from 'react-native';

const ShadowBox = () => {
  return <View style={styles.box} />;
};

const styles = StyleSheet.create({
  box: {
    width: 100,
    height: 100,
    backgroundColor: '#FFF',

    // Shadow for iOS
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.1, // Approximation of the 00 transparency
    shadowRadius: 12,

    // Shadow for Android
    elevation: 6,
  },
});

export default ShadowBox;
