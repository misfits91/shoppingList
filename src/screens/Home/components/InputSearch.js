import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'

export default function InputSearch({
  onSubmitEditing
}) {
  const [value, setValue] = useState('');

  const onChangeText = value => setValue(value);

  const handleSubmit = () => onSubmitEditing(value);

  const handleClearInput = () => setValue('');

  return (
    <View style={styles.container}>
      <Icon
        name='search'
        color='black'
        size={20}
        style={styles.iconSearch}
      />
      <TextInput
        autoCapitalize='none'
        autoCorrect={false}
        clearButtonMode='always'
        placeholder='Buscar...'
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={handleSubmit}
        returnKeyLabel='Buscar'
        returnKeyType='search'
        underlineColorAndroid='transparent'
      />
      {value.length > 0 && <TouchableOpacity
        style={styles.closeButtonParent}
        onPress={handleClearInput}>
        <View style={styles.closeButton}>
          <Icon
            name='close'
            color='white'
          />
        </View>
      </TouchableOpacity>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f3f3f3',
    padding: 5,
    marginVertical: 15,
    borderRadius: 8,
    flexDirection: 'row',
    paddingHorizontal: 10,
    marginHorizontal: 16,
    alignItems: 'center'
  },
  iconSearch: {
    marginRight: 5
  },
  input: {
    flex: 1,
    margin: 0,
    padding: 0
  },
  closeButton: {
    height: 16,
    width: 16,
    backgroundColor: 'grey',
    borderRadius: 16 / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonParent: {
    justifyContent: 'center',
    alignItems: 'center'
  }
});
