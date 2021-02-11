import React, { useState } from 'react';
import {
  View,
  StyleSheet
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Animated from 'react-native-reanimated';
/** components */
import { InputSearch, ItemList } from './components';
/** api calls */
import { fetchData, fetchDescription, fetchImages } from '../../utlis/Api';
/** reducer actions */
import { setData, setItem } from '../../reducer';
/** constants */
import { HEADER_HEIGHT } from '../../utlis/Contants';

export default function Home({ navigation }) {
  const dispatch = useDispatch();
  const data = useSelector(state => state.data);

  const scrollY = new Animated.Value(0);
  const diffClampScrollY = Animated.diffClamp(scrollY, 0, HEADER_HEIGHT);
  const headerHeight = Animated.interpolate(diffClampScrollY, {
    inputRange: [0, HEADER_HEIGHT],
    outputRange: [HEADER_HEIGHT, 0],
    extrapolate: 'clamp'
  })

  const translateY = Animated.interpolate(diffClampScrollY, {
    inputRange: [0, HEADER_HEIGHT],
    outputRange: [0, -HEADER_HEIGHT],
    extrapolate: 'clamp'
  })

  const headerOpacity = Animated.interpolate(diffClampScrollY, {
    inputRange: [0, HEADER_HEIGHT],
    outputRange: [1, 0],
    extrapolate: 'clamp'
  })

  const [loading, setLoading] = useState(false);

  const onSearch = async query => {
    setLoading(true);
    const data = await fetchData({ query });
    dispatch(setData(data));
    setLoading(false);
  };

  const handleDetails = async item => {
    const images = await fetchImages({ id: item.id });
    const description = await fetchDescription({ id: item.id });
    const data = {
      ...item,
      images,
      description
    };
    dispatch(setItem(data));
    navigation.navigate('Details');
  };

  return (
    <View style={styles.container}>
      <InputSearch
        onSubmitEditing={onSearch}
        translateY={translateY}
        height={headerHeight}
        opacity={headerOpacity}
      />
      <ItemList
        data={data}
        isLoading={loading}
        onPress={handleDetails}
        scrollY={scrollY}
      />
    </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  }
});
