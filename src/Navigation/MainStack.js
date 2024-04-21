import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Home from '../screens/Home';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProductList from '../screens/ProductList';

const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown:false}}>
        <Stack.Screen
          name="Home"
          component={Home}
        />
        
        <Stack.Screen
        name="ProductList"
        component={ProductList}
      />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default MainStack;