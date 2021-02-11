import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView
} from 'react-native';
import { useSelector } from 'react-redux';

/** components */
import { Carousel, DetailsItem, Back } from './components';

export default function Details({ navigation }) {
  const item = useSelector(state => state.item);
  const { title, price, description, images } = item;

  const handleBack = () => navigation.goBack();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Back
        onPress={handleBack}
      />
      <Carousel
        data={images}
      />
      <DetailsItem
        title={title}
        description={description}
        price={price}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: 'white'
  }
}); 
