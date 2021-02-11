import React, { useCallback, memo, useRef, useState } from 'react';
import {
  FlatList,
  View,
  Dimensions,
  StyleSheet,
  Image,
} from 'react-native';

const { width: windowWidth } = Dimensions.get('window');

const Slide = memo(function Slide({ url }) {
  return (
    <View style={styles.slide}>
      <Image
        source={{ uri: url }}
        style={styles.slideImage}
      />
    </View>
  );
});

const Pagination = ({ index, data }) => {
  return (
    <View
      style={styles.pagination}
      pointerEvents='none'>
      {data.map((_, i) => {
        return (
          <View
            key={i}
            style={[
              styles.paginationDot,
              index === i
                ? styles.paginationDotActive
                : styles.paginationDotInactive,
            ]}
          />
        );
      })}
    </View>
  );
};

export default function Carousel({
  data = []
}) {
  const [index, setIndex] = useState(0);
  const indexRef = useRef(index);
  indexRef.current = index;
  const onScroll = useCallback((event) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const index = event.nativeEvent.contentOffset.x / slideSize;
    const roundIndex = Math.round(index);
    const distance = Math.abs(roundIndex - index);
    const isNoMansLand = 0.4 < distance;

    if (roundIndex !== indexRef.current && !isNoMansLand) {
      setIndex(roundIndex);
    }
  }, []);

  const flatListOptimizationProps = {
    initialNumToRender: 0,
    maxToRenderPerBatch: 1,
    removeClippedSubviews: true,
    scrollEventThrottle: 16,
    windowSize: 2,
    keyExtractor: useCallback(x => x.id, []),
    getItemLayout: useCallback(
      (_, index) => ({
        index,
        length: windowWidth,
        offset: index * windowWidth,
      }),
      []
    ),
  };

  const renderItem = useCallback(function renderItem({ item: { url } }) {
    return <Slide url={url} />;
  }, []);

  return (
    <View style={{
      height: 200
    }}>
      <FlatList
        data={data}
        style={styles.carousel}
        renderItem={renderItem}
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        bounces={false}
        onScroll={onScroll}
        {...flatListOptimizationProps}
      />
      <Pagination
        index={index}
        data={data}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  slide: {
    flexGrow: 0
  },
  slideImage: {
    width: windowWidth,
    height: 200,
    resizeMode: 'contain'
  },
  pagination: {
    position: 'absolute',
    bottom: 8,
    width: '100%',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 2
  },
  paginationDotActive: {
    backgroundColor: 'rgba(105, 105, 105, 1)'
  },
  paginationDotInactive: {
    backgroundColor: 'rgba(105, 105, 105, 0.5)'
  },
  carousel: {
    flex: 1,
    backgroundColor: 'white'
  }
});
