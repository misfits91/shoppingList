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
import Animated from 'react-native-reanimated';

const Item = ({ thumbnail, title, price, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    style={styles.listItem}>  
    <Image
      source={{ uri: thumbnail }}
      style={styles.image}
    />
    <View style={styles.itemDetails}>
      <Text style={styles.itemTitle}>{title}</Text>
      <Text style={styles.itemPrice}>{`$${price}`}</Text>
    </View>
  </TouchableOpacity>
);

export default function ItemList({
  data = [],
  isLoading,
  onPress,
  scrollY
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
      size='small'
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
      bounces={false}
      scrollEventThrottle={16}
      style={styles.list}
      renderScrollComponent={(props) => (
        <Animated.ScrollView
          { ...props }
          onScroll={ Animated.event(
            [
              { nativeEvent: { contentOffset: { y: scrollY } } }
            ]
          )}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1
  },
  listItem: {
    borderRadius: 15,
    backgroundColor: 'white',
    margin: 10,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
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
  },
  itemDetails: {
    flex: 1,  
    padding: 5,
    justifyContent: 'space-between'
  },
  itemTitle: {
    fontWeight: '600',
    color: 'black'
  },
  itemPrice: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 16
  }
});
