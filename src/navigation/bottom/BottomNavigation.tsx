import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { bottomData } from '../NavigationData';
import Icon from 'react-native-vector-icons/FontAwesome5';
import theme from '../../theme/theme';

const Tab = createBottomTabNavigator();

const BottomNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: theme.color.black,
        },
        tabBarActiveTintColor: theme.color.black,
        tabBarInactiveTintColor: theme.color.white,
        tabBarActiveBackgroundColor: theme.color.white,
      }}>
      {bottomData.map(({ name, icon, component }, index) => (
        <Tab.Screen
          key={`bNavi_${index}`}
          name={name}
          component={component}
          options={{
            tabBarIcon: ({ color }) => (
              <Icon name={icon} color={color} size={22} />
            ),
          }}
        />
      ))}
    </Tab.Navigator>
  );
};

export default BottomNavigation;
