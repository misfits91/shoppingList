import React from 'react';
import {
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function Back({
  onPress
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.container}>
      <Icon
        name='keyboard-arrow-left'
        color='black'
        size={20}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 15,
    backgroundColor: 'rgba(193, 193, 193, 0.6)',
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 1000
  }
});
