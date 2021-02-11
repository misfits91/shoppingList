import React from 'react';
import { StatusBar, SafeAreaView, Platform } from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

/** routes */
import Routes from './src/navigation';

/** reducer */
import rootReducer from './src/reducer';

const store = createStore(rootReducer)

const App = () => (
  <Provider store={store}>
    <StatusBar
      barStyle={Platform.OS === 'android' ? 'light-content' : 'dark-content'}
      backgroundColor='black'
    />
    <SafeAreaView style={{ flex: 0 }} />
    <Routes/>
  </Provider>
);

export default App;
