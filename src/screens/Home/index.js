import React, { useState } from 'react';
import {
  View,
  StyleSheet
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

/** components */
import { InputSearch, ItemList } from './components';

/** api calls */
import { fetchData, fetchDescription, fetchImages } from '../../utlis/Api';

/** reducer actions */
import { setData, setItem } from '../../reducer';

export default function Home({ navigation }) {
  const dispatch = useDispatch();
  const data = useSelector(state => state.data);

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
      />
      <ItemList
        data={data}
        isLoading={loading}
        onPress={handleDetails}
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
