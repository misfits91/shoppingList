import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

/** screens */
import Home from '../screens/Home';
import Details from '../screens/Details';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Home'
        headerMode='none'>
        <Stack.Screen 
          name='Home'
          component={Home}
        />
        <Stack.Screen 
          name='Details'
          component={Details}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;