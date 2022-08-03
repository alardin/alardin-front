import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { stackData } from '../NavigationData';

const Stack = createStackNavigator();

const StackNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="BottomNavigation">
      {stackData.map(({ name, component }, index) => (
        <Stack.Screen
          key={`sNavi_${index}`}
          name={name}
          component={component}
          options={{ headerShown: false }}
        />
      ))}
    </Stack.Navigator>
  );
};

export default StackNavigation;
