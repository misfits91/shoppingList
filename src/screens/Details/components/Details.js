import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert
} from 'react-native';

function formatPrice(price = 0) {
  const priceFormatted = `$${price.toFixed(2)}`;
  return priceFormatted;
};

export default function DetailsItem({
  title = '',
  price = 0,
  description = ''
}) {
  const handleBuy = () => Alert.alert(
    'Aviso',
    'Es necesario iniciar sesión',
    [
      { text: 'Aceptar', onPress: () => null }
    ],
    { cancelable: false }
  );

  return (
    <View style={styles.container}>
      <View style={styles.containerItem}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.containerItem}>
        <Text style={styles.descriptionTitle}>Descripción</Text>
        <Text style={styles.description}>{description}</Text>
        <View style={styles.separator} />
        <View style={styles.bottomContainer}>
          <View>
            <Text style={styles.price}>{formatPrice(price)}</Text>
            <Text style={styles.description}>Total a pagar</Text>
          </View>
          <TouchableOpacity
            onPress={handleBuy}
            style={styles.buyButton}>
            <Text style={styles.buttonText}>Comprar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15
  },
  containerItem: {
    backgroundColor: 'white',
    borderRadius: 15,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    padding: 20,
    marginBottom: 10
  },
  title: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold'
  },
  price: {
    color: 'black',
    fontSize: 17,
    fontWeight: '700'
  },
  descriptionTitle: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10
  },
  description: {
    color: 'gray',
    fontSize: 14,
    fontWeight: '300'
  },
  separator: {
    width: '95%',
    height: 1,
    backgroundColor: '#E0E0E0',
    alignSelf: 'center',
    marginVertical: 20
  },
  resume: {
    color: 'black',
    fontSize: 15,
    fontWeight: '700'
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  buyButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    padding: 15,
    borderRadius: 15,
    flex: 1 / 2
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold'
  }
});
