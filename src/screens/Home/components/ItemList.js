import React from 'react';
import {
  FlatList,
  View,
  Image,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity
} from 'react-native';

const Item = ({ thumbnail, title, price, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    style={styles.listItem}>  
    <Image
      source={{ uri: thumbnail }}
      style={styles.image}
    />
    <View style={{
      flex: 1,  
      padding: 5,
      justifyContent: 'space-between'
    }}>
      <Text style={{
        fontWeight: '600',
        color: 'black'
      }}>{title}</Text>
      <Text style={{
        fontWeight: 'bold',
        color: 'black',
        fontSize: 16
      }}>{`$${price}`}</Text>
    </View>
  </TouchableOpacity>
);

export default function ItemList({
  data = [],
  isLoading,
  onPress
}) {
  const keyExtractor = item => item.id;

  const renderItem = ({ item: { thumbnail, title, price, id } }) => {
    const onPressItem = () => {
      const data = {
        title,
        price,
        id
      };
      onPress(data);
    };
    
    return (
      <Item
        thumbnail={thumbnail}
        title={title}
        price={price}
        onPress={onPressItem}
      />
    )
  };

  if (isLoading) {
    return <ActivityIndicator
      size='large'
      color='black'
    />
  }

  if (data.length === 0 && !isLoading) {
    return <View style={styles.noDataContainer}>
      <Text style={styles.useInputSearch}>Usa el buscador para encontrar productos</Text>
    </View>
  }

  return (
    <FlatList
      data={data}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      numColumns={2}
    />
  )
};

const styles = StyleSheet.create({
  listItem: {
    borderRadius: 15,
    backgroundColor: 'white',
    margin: 10,
    elevation: 10,
    paddingVertical: 5,
    paddingHorizontal: 3,
    flex: 1/2
  },
  noDataContainer: {
    flex: 1,
    alignItems: 'center',
    padding: 20
  },
  useInputSearch: {
    color: 'black',
    fontWeight: '700',
    textAlign: 'center'
  },
  image: {
    height: 200,
    resizeMode: 'contain'
  }
});
